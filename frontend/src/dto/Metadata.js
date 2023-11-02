/**
 * Metadata DTO
 * @class Metadata
 * @property {string} propertyType
 * @property {number} bathrooms
 * @property {Bedroom} bedrooms
 * @property {string[]} amenities
 * @property {string[]} images
 */
class Metadata {
  constructor (propertyType, bathrooms, bedrooms, amenities, images) {
    this.propertyType = propertyType;
    this.bathrooms = bathrooms;
    this.bedrooms = bedrooms;
    this.amenities = amenities;
    this.images = images;
  }
}

export default Metadata;
