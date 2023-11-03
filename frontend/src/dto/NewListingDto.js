/**
 * NewListingDto DTO class
 * @class NewListingDto
 * @property {string} title
 * @property {AddressDto} address
 * @property {number} price
 * @property {string} thumbnail
 * @property {MetadataDto} metadata
 */
class NewListingDto {
  constructor (title, address, price, thumbnail, metadata) {
    this.title = title;
    this.address = address;
    this.price = price;
    this.thumbnail = thumbnail;
    this.metadata = metadata;
  }
}

export default NewListingDto;
