import { apiCall } from '../../services/api';
import { getListing } from '../listings/actions';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  formatDuration,
  formatISO,
  intervalToDuration,
  max,
  min,
  parseISO,
  subDays
} from 'date-fns';

/**
 * Get all bookings
 * @returns {Promise<{success: boolean, error: (*|string)}|{success: boolean, data: *}>}
 */
export const getAllBookings = async () => {
  return await apiCall('bookings', 'GET');
}

export const getAllBookingDetails = async (listingId) => {
  const bookingsResponse = await getAllBookings();

  const filteredBookings = bookingsResponse.data.bookings.filter(
    booking => parseInt(booking.listingId) === listingId
  );

  const bookingDetails = {
    listingId,
    detailedBookings: [],
    daysBookedThisYear: 0,
    profitThisYear: 0
  };

  const listingResponse = await getListing(listingId);

  const postedOn = listingResponse.data.listing.postedOn;
  const postedOnDate = parseISO(postedOn);
  const now = new Date();

  const duration = intervalToDuration({ start: postedOnDate, end: now });
  bookingDetails.onlineDuration = formatDuration(duration);
  bookingDetails.postedOn = postedOn;

  for (const booking of filteredBookings) {
    // Calculate days booked and profit for 'accepted' bookings this year
    if (booking.status === 'accepted' && new Date(booking.dateRange[0]).getFullYear() === now.getFullYear()) {
      const startDate = parseISO(booking.dateRange[0]);
      const endDate = parseISO(booking.dateRange[1]);
      bookingDetails.daysBookedThisYear += differenceInCalendarDays(endDate, startDate);
      bookingDetails.profitThisYear += booking.totalPrice;
    }

    bookingDetails.detailedBookings.push({
      ...booking,
    });
  }

  return bookingDetails;
}

export const getProfitData = async () => {
  // Get all bookings first
  const bookingsResponse = await getAllBookings();

  // Filter out only bookings that are accepted
  const acceptedBookings = bookingsResponse.data.bookings.filter(
    booking => booking.status === 'accepted'
  );

  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  const dailyProfits = {};

  // Initialise dailyProfits object with 0 profit for each day
  eachDayOfInterval({ start: thirtyDaysAgo, end: today }).forEach(day => {
    dailyProfits[formatISO(day, { representation: 'date' })] = 0;
  });

  for (const booking of acceptedBookings) {
    const startDate = parseISO(booking.dateRange[0]);
    const endDate = parseISO(booking.dateRange[1]);

    const listingResponse = await getListing(booking.listingId);
    const listingPrice = listingResponse.data.listing.price;

    const adjustedStartDate = max([startDate, thirtyDaysAgo]);
    const adjustedEndDate = min([endDate, today]);

    if (adjustedStartDate <= adjustedEndDate) {
      eachDayOfInterval({
        start: adjustedStartDate,
        end: adjustedEndDate
      }).forEach(day => {
        const dateString = formatISO(day, { representation: 'date' });
        if (dailyProfits[dateString] !== undefined) {
          dailyProfits[dateString] += listingPrice;
        }
      });
    }
  }

  return Object.keys(dailyProfits).map(key => ({
    day: differenceInCalendarDays(today, parseISO(key)),
    profit: dailyProfits[key]
  })).sort((a, b) => b.day - a.day);
}
