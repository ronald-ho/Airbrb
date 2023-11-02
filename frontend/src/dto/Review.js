/**
 * Review DTO
 * @class Review
 * @property {number} rating
 * @property {string} message
 */
class Review {
  constructor (rating, message) {
    this.rating = rating;
    this.message = message;
  }
}

export function convertToReviewDTOs (reviewsJson) {
  return reviewsJson.map(review => new Review(review.rating, review.message));
}

export default Review;
