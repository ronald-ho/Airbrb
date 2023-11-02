/**
 * NewListing DTO class
 * @class NewListing
 * @property {string} title
 * @property {Address} address
 * @property {number} price
 * @property {string} thumbnail
 * @property {Metadata} metadata
 */
class NewListing {
  constructor (title, address, price, thumbnail, metadata) {
    this.title = title;
    this.address = address;
    this.price = price;
    this.thumbnail = thumbnail;
    this.metadata = metadata;
  }
}

export default NewListing;
