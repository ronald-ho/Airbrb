// Helper function to calculate average review for listing
const averageRating = (reviews) => {
  let totalRatings = 0;

  for (const review of reviews) {
    totalRatings += Number(review.rating);
  }

  return Math.round((totalRatings / reviews.length) * 10) / 10;
};

// Converts address json to a string
const addressToString = (address) => {
  return `${address.number} ${address.street}, ${address.city}, ${address.state}`
}

export { averageRating, addressToString };

const Ajv = require('ajv');
export const customAjv = new Ajv({ allErrors: true });

customAjv.addFormat('base64image', {
  type: 'string',
  validate: (data) => {
    const regex = /^data:image\/(png|jpeg|jpg);base64,/;
    return regex.test(data);
  }
});

export const listingSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    address: {
      type: 'object',
      properties: {
        number: { type: 'string' },
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        postcode: { type: 'string' },
        country: { type: 'string' }
      },
      required: ['number', 'street', 'city', 'state', 'postcode', 'country']
    },
    price: {
      type: 'number'
    },
    thumbnail: {
      type: 'string',
      format: 'base64image'
    },
    metadata: {
      type: 'object',
      properties: {
        propertyType: { type: 'string' },
        bathrooms: { type: 'integer' },
        bedrooms: { type: 'integer' },
        beds: { type: 'integer' },
        amenities: {
          type: 'array',
          items: { type: 'string' }
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'base64image'
          }
        }
      },
      required: ['propertyType', 'bathrooms', 'bedrooms', 'beds', 'amenities', 'images']
    }
  },
  required: ['title', 'address', 'price', 'thumbnail', 'metadata']
}
