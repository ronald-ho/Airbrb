import { convertToBedroomDTOs } from './BedroomDto';

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

/**
 * Converts a JSON object to a MetadataDto DTO
 * @param metadataJson
 * @returns {MetadataDto}
 */
export function convertToMetadataDTO (metadataJson) {
  const bedrooms = convertToBedroomDTOs(metadataJson.bedrooms || []);

  return new MetadataDto(
    metadataJson.propertyType,
    metadataJson.bathrooms,
    bedrooms,
    metadataJson.amenities,
    metadataJson.images
  );
}
