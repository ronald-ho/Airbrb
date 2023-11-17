import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NumberInputFieldCustom from '../components/NumberInputFieldCustom';

describe('NumberInputFieldCustom Component Tests', () => {
  const mockOnChange = jest.fn();

  it('renders without crashing', () => {
    render(<NumberInputFieldCustom title="Test" value={5} onChange={() => {
    }}/>);
    expect(screen.getByText('Test:')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    render(<NumberInputFieldCustom title="Test Title" value={5} onChange={() => {}} />);
    expect(screen.getByText('Test Title:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('5');
  });

  it('does not decrement below minimum value', () => {
    render(<NumberInputFieldCustom title="Test" value={1} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('-'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('updates value on input change', () => {
    const handleChange = jest.fn();
    render(<NumberInputFieldCustom value={5} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '7' } });
    expect(handleChange).toHaveBeenCalledWith(7);
  });

  it('displays the provided title', () => {
    render(<NumberInputFieldCustom title="Quantity" value={5} onChange={() => {}} />);
    expect(screen.getByText('Quantity:')).toBeInTheDocument();
  });
});
