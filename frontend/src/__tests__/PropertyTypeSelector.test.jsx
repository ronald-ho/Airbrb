import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import PropertyTypeSelector from '../components/PropertyTypeSelector';

describe('Property type selector when creating listing', () => {
  test('Renders PropertyTypeSelector with default state', () => {
    render(<PropertyTypeSelector propertyType="House" onChange={() => {
    }}/>);

    // Check if "House" is selected
    expect(screen.getByAltText('House')).toHaveStyle('border: 1px solid black');
    // Check if "Apartment" is not selected
    expect(screen.getByAltText('Apartment')).not.toHaveStyle('border: 1px solid black');
  });

  test('Calls onChange with "Apartment" when Apartment is clicked', () => {
    const mockOnChange = jest.fn();

    render(<PropertyTypeSelector propertyType="House" onChange={mockOnChange}/>);

    // Click the "Apartment" image
    fireEvent.click(screen.getByAltText('Apartment'));

    // Check if onChange is called with "Apartment"
    expect(mockOnChange).toHaveBeenCalledWith('Apartment');
  });

  test('Calls onChange with "House" when House is clicked', () => {
    const mockOnChange = jest.fn();

    render(<PropertyTypeSelector propertyType="Apartment" onChange={mockOnChange}/>);

    // Click the "House" image
    fireEvent.click(screen.getByAltText('House'));

    // Check if onChange is called with "House"
    expect(mockOnChange).toHaveBeenCalledWith('House');
  });
});
