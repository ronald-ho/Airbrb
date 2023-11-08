// Helper function to calculate average review for listing
const averageRating = (reviews) => {
  let totalRatings = 0;

  for (const review of reviews) {
    totalRatings += Number(review.rating);
  }

  console.log(totalRatings, reviews.length);

  return Math.round((totalRatings / reviews.length) * 10) / 10;
};

// Converts address json to a string
const addressToString = (address) => {
  return `${address.number} ${address.street}, ${address.city}, ${address.state}`
}

export { averageRating, addressToString };
