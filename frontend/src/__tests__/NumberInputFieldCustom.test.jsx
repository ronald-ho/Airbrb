import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import NumberInputFieldCustom from '../components/NumberInputFieldCustom';

describe('NumberInputFieldCustom Component Tests', () => {
  it('renders without crashing', () => {
    render(<NumberInputFieldCustom title="Test" value={5} onChange={() => {
    }}/>);
    expect(screen.getByText('Test:')).toBeInTheDocument();
  });

  it('increments and decrements the value', () => {
    const mockOnChange = jest.fn();
    render(<NumberInputFieldCustom title="Test" value={5} onChange={mockOnChange}/>);

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(6);

    fireEvent.click(decrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(4);
  });

  it('updates value on direct input', () => {
    const mockOnChange = jest.fn();
    render(<NumberInputFieldCustom title="Test" value={5} onChange={mockOnChange}/>);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  it('increments value by 1 when clicking the plus button', () => {
    const mockOnChange = jest.fn();
    render(<NumberInputFieldCustom title="Test" value={1} onChange={mockOnChange}/>);

    const incrementButton = screen.getByText('+');

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(2);

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(3);

    fireEvent.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalledWith(4);
  });
});
