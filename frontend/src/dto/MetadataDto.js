/**
 * MetadataDto DTO
 * @class MetadataDto
 * @property {string} propertyType
 * @property {number} bathrooms
 * @property {number} bedrooms
 * @property {number} beds
 * @property {string[]} amenities
 * @property {string[]} images
 */
class MetadataDto {
  constructor (propertyType, bathrooms, bedrooms, beds, amenities, images) {
    this.propertyType = propertyType;
    this.bathrooms = bathrooms;
    this.bedrooms = bedrooms;
    this.beds = beds;
    this.amenities = amenities;
    this.images = images;
  }
}

/**
 * Converts a JSON object to a MetadataDto DTO
 * @param metadataJson
 * @returns {MetadataDto}
 */
export function convertToMetadataDTO (metadataJson) {
  return new MetadataDto(
    metadataJson.propertyType,
    metadataJson.bathrooms,
    metadataJson.bedrooms,
    metadataJson.beds,
    metadataJson.amenities,
    metadataJson.images
  );
}
