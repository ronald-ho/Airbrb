/**
 * Address DTO
 * @class Address
 * @property {string} number
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} country
 */
class Address {
  constructor (number, street, city, state, postalCode, country) {
    this.number = number;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }
}

export function convertToAddressDTO (addressJson) {
  return new Address(
    addressJson.number,
    addressJson.street,
    addressJson.city,
    addressJson.state,
    addressJson.postalCode,
    addressJson.country
  );
}

export default Address;
