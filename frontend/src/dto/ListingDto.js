import { convertToAddressDTO } from 'frontend/src/dto/AddressDto';
import { convertToReviewDTOs } from 'frontend/src/dto/ReviewDto';

/**
 * ListingDto DTO
 * @class ListingDto
 * @property {number} id
 * @property {string} title
 * @property {string} owner
 * @property {AddressDto} address
 * @property {string} thumbnail
 * @property {number} price
 * @property {ReviewDto[]} reviews
 */
class ListingDto {
  constructor (id, title, owner, address, thumbnail, price, reviews) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.address = address;
    this.thumbnail = thumbnail;
    this.price = price;
    this.reviews = reviews;
  }
}

export function convertToListingDTOs (listingJson) {
  return listingJson.map(item => {
    const addressDTO = convertToAddressDTO(item.address || {});
    const reviewsDTO = convertToReviewDTOs(item.reviews || []);
    return new ListingDto(
      item.id,
      item.title,
      item.owner,
      addressDTO,
      item.thumbnail,
      item.price,
      reviewsDTO
    );
  });
}

export default ListingDto;
