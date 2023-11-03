/**
 * BedroomDto DTO
 * @class BedroomDto
 * @property {number} bedCount
 * @property {string} bedType
 */
class BedroomDto {
  constructor (bedCount, bedType) {
    this.bedCount = bedCount;
    this.bedType = bedType;
  }
}

/**
 * Converts a JSON object to a BedroomDto DTO
 * @param bedroomsJson
 * @returns {BedroomDto[]}
 */
export function convertToBedroomDTOs (bedroomsJson) {
  return bedroomsJson.map(bedroom => new BedroomDto(bedroom.bedCount, bedroom.bedType));
}
