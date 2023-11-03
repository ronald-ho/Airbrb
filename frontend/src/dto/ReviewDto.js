/**
 * ReviewDto DTO
 * @class ReviewDto
 * @property {number} rating
 * @property {string} message
 */
class ReviewDto {
  constructor (rating, message) {
    this.rating = rating;
    this.message = message;
  }
}

export function convertToReviewDTOs (reviewsJson) {
  return reviewsJson.map(review => new ReviewDto(review.rating, review.message));
}
