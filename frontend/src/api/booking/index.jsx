import { apiCall } from '../../services/api';
import { getListing } from '../listings/actions';
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInHours,
  parseISO
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
  const now = new Date();

  const filteredBookings = bookingsResponse.data.bookings.filter(
    booking => booking.listingId === listingId
  );

  const bookingDetails = {
    listingId,
    detailedBookings: [],
    daysBookedThisYear: 0,
    profitThisYear: 0
  };

  for (const booking of filteredBookings) {
    const listingResponse = await getListing(booking.listingId);
    const postedOn = listingResponse.data.listing.postedOn;
    const postedOnISO = parseISO(postedOn);

    // Calculate how long the listing has been up online
    const years = differenceInCalendarYears(now, postedOnISO);
    const months = differenceInCalendarMonths(now, postedOnISO);
    const days = differenceInCalendarDays(now, postedOnISO);
    const hours = differenceInHours(now, postedOnISO);

    bookingDetails.onlineDuration = { years, months, days, hours };
    bookingDetails.postedOn = postedOn;

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
