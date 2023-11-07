// Helper function to calculate average review for listing
const averageRating = (reviews) => {
  let totalRatings = 0;

  for (const review of reviews) {
    totalRatings += review.rating;
  }

  return totalRatings / reviews.length;
};

// Converts address json to a string
const addressToString = (address) => {
  return `${address.number} ${address.street}, ${address.city}, ${address.state}`
}

export { averageRating, addressToString };
