/**
 * MetadataDto DTO
 * @class MetadataDto
 * @property {string} propertyType
 * @property {number} bathrooms
 * @property {BedroomDto} bedrooms
 * @property {string[]} amenities
 * @property {string[]} images
 */
class MetadataDto {
  constructor (propertyType, bathrooms, bedrooms, amenities, images) {
    this.propertyType = propertyType;
    this.bathrooms = bathrooms;
    this.bedrooms = bedrooms;
    this.amenities = amenities;
    this.images = images;
  }
}

export default MetadataDto;
