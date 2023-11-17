import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Popup from '../components/Popup';

describe('Popup', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  test('Renders popup with correct title and body', () => {
    render(
      <Popup
        title="Test Title"
        body="Test Body"
        primaryButtonText="Confirm"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    // Check if the title, body and button are rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('Calls onClose when close button is clicked', () => {
    render(
      <Popup
        title="Test Title"
        body="Test Body"
        primaryButtonText="Confirm"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    // Click the "Close" button
    fireEvent.click(screen.getByText('Close'));

    // Check if onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('Calls onConfirm when confirm button is clicked', () => {
    render(
      <Popup
        title="Test Title"
        body="Test Body"
        primaryButtonText="Confirm"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    // Click the "Confirm" button
    fireEvent.click(screen.getByText('Confirm'));

    // Check if onConfirm is called
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
