import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { InputBar } from '../components/SearchBar';

// Note, we can't test the calendar inputs as the calendar buttons used to trigger changes
// don't actually render in this
describe('Input bar to enter text and calendar dates', () => {
  test('renders InputBar correctly', () => {
    const onClickHandlerMock = jest.fn();
    const updateFiltersMock = jest.fn();

    render(
      <BrowserRouter>
        <InputBar onClickHandler={onClickHandlerMock} updateFilters={updateFiltersMock}/>
      </BrowserRouter>
    );

    // Check if important elements are present
    expect(screen.getByLabelText('Text Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Select check-in/out dates')).toBeInTheDocument();
    expect(screen.getByLabelText('Submit Search')).toBeInTheDocument();
  });

  test('Updates textInput on user input', () => {
    const onClickHandlerMock = jest.fn();
    const updateFiltersMock = jest.fn();

    render(
      <BrowserRouter>
        <InputBar onClickHandler={onClickHandlerMock} updateFilters={updateFiltersMock}/>
      </BrowserRouter>
    );

    // Type into the text input
    fireEvent.change(screen.getByLabelText('Text Search'), { target: { value: 'Sydney' } });

    // Check if textInput is updated
    expect(screen.getByLabelText('Text Search')).toHaveValue('Sydney');
  });

  test('Calls onClickHandler when Search button is clicked', () => {
    const onClickHandlerMock = jest.fn();
    const updateFiltersMock = jest.fn();

    render(
      <BrowserRouter>
        <InputBar onClickHandler={onClickHandlerMock} updateFilters={updateFiltersMock}/>
      </BrowserRouter>
    );

    // Click the Search button
    fireEvent.click(screen.getByLabelText('Submit Search'));

    // Check if onClickHandler is called
    expect(onClickHandlerMock).toHaveBeenCalled();
  });
});
