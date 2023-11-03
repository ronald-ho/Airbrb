import { convertToAddressDTO } from './AddressDto';
import { convertToMetadataDTO } from './MetadataDto';
import { convertToReviewDTOs } from './ReviewDto';

/**
 * ListingDto DTO
 * @class ListingDto
 * @property {string} title
 * @property {string} owner
 * @property {AddressDto} address
 * @property {number} price
 * @property {string} thumbnail
 * @property {MetadataDto} metadata
 * @property {ReviewDto[]} reviews
 * @property {Date[]} availability
 * @property {boolean} published
 * @property {string} postedOn
 */
class ListingDto {
  constructor (title, owner, address, price, thumbnail, metadata, reviews, availability, published, postedOn) {
    this.title = title;
    this.owner = owner;
    this.address = address;
    this.price = price;
    this.thumbnail = thumbnail;
    this.metadata = metadata;
    this.reviews = reviews;
    this.availability = availability;
    this.published = published;
    this.postedOn = postedOn;
  }
}

/**
 * Converts a JSON object to a ListingDto DTO
 * @param listingJson
 * @returns {ListingDto[]}
 */
export function convertToListingDTOs (listingJson) {
  return listingJson.map(listing => {
    const addressDto = convertToAddressDTO(listing.address);
    const metadataDto = convertToMetadataDTO(listing.metadata);
    const reviewsDto = convertToReviewDTOs(listing.reviews);
    const availability = listing.availability;
    return new ListingDto(
      listing.title,
      listing.owner,
      addressDto,
      listing.price,
      listing.thumbnail,
      metadataDto,
      reviewsDto,
      availability,
      listing.published,
      listing.postedOn
    );
  });
}
