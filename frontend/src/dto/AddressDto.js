/**
 * AddressDto DTO
 * @class AddressDto
 * @property {string} number
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} postCode
 * @property {string} country
 */
class AddressDto {
  constructor (number, street, city, state, postCode, country) {
    this.number = number;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postCode = postCode;
    this.country = country;
  }
}

export function convertToAddressDTO (addressJson) {
  return new AddressDto(
    addressJson.number,
    addressJson.street,
    addressJson.city,
    addressJson.state,
    addressJson.postCode,
    addressJson.country
  );
}

export default AddressDto;
