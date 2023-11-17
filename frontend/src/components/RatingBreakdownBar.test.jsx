import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RatingBreakdownBar from './RatingBreakdownBar';

describe('RatingBreakdownBar', () => {
  const listing = {
    reviews: [
      { rating: 5, message: 'Great!' },
      { rating: 5, message: 'Excellent!' },
      { rating: 4, message: 'Mostly good!' },
    ],
  };

  test('Basic Test Case - Breakdown with reviews', () => {
    const rating = 5;
    const { getByText, getByRole, queryByText, queryAllByLabelText } = render(
      <RatingBreakdownBar listing={listing} rating={rating} />
    );

    // Assert that the component renders with all ratings
    expect(getByText(`${rating} Stars`)).toBeInTheDocument();
    expect(getByText(/reviews/)).toBeInTheDocument();

    // Trigger the modal open
    fireEvent.click(getByRole('button'));

    // Assert that the modal content is rendered
    expect(getByText(`${rating} Star Reviews`)).toBeInTheDocument();

    let count = 0;
    listing.reviews.forEach((review) => {
      if (review.rating === rating) {
        expect(getByText(review.message)).toBeInTheDocument();
        count += 1;
      } else {
        // Assert that other reviews that do not have the same rating
        // are not rendered in the modal
        expect(queryByText(review.message)).not.toBeInTheDocument();
      }
    });

    // Verify that the number of SVG ratings with rating are equal to count
    // of rendered messages
    const ratings = queryAllByLabelText(/Rating of . stars/i);
    expect(ratings.length).toEqual(count);
  });

  test('Edge Case - Breakdown for rating with no reviews', () => {
    const rating = 1;
    const { getByText, getByRole, queryByText } = render(
      <RatingBreakdownBar listing={listing} rating={rating} />
    );

    // Assert that the component renders with all ratings
    expect(getByText(`${rating} Stars`)).toBeInTheDocument();
    expect(getByText(/reviews/)).toBeInTheDocument();

    // Trigger the modal open
    fireEvent.click(getByRole('button'));

    // Assert that the modal content is rendered
    expect(getByText(`${rating} Star Reviews`)).toBeInTheDocument();

    listing.reviews.forEach((review) => {
      if (review.rating === rating) {
        expect(getByText(review.message)).toBeInTheDocument();
      } else {
        // Assert that other reviews that do not have the same rating
        // are not rendered in the modal
        expect(queryByText(review.message)).not.toBeInTheDocument();
      }
    });
  });
});
