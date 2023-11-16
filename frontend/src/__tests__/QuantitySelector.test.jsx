/* eslint-disable */
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import QuantitySelector from '../components/QuantitySelector';

describe('Quantity Selector', () => {
  let currentValue = [0, 1000];

  const setter = jest.fn()

  const props = {
    title: 'Price',
    defaults: [0, 1000],
    value: currentValue,
    setter
  }

  test('Can render with correct initial values', () => {
    const {queryAllByRole, getByText} = render(<QuantitySelector {...props} />);
    const sliders = queryAllByRole(/slider/i);
    const title = getByText(/Price/i);
    const minimum = getByText(/^0/i);

    // Initial display should have '+' for maximum
    const maximum = getByText(/1000+/i);

    expect(title).toBeInTheDocument();
    expect(Number(sliders[0].getAttribute('aria-valuenow'))).toEqual(0);
    expect(Number(sliders[1].getAttribute('aria-valuenow'))).toEqual(1000);
  });

  test('Can change values', async () => {
    const user = userEvent.setup();
    // const { queryAllByRole, getByText } = render(<QuantitySelector {...props} />);
    render(<QuantitySelector {...props} />);
    const sliders = screen.getAllByRole(/slider/i);
    const test = screen.getByText(/0/i);

    const leftThumb = sliders[0];
    await user.pointer([
      {keys: '[MouseLeft>]', target: leftThumb},
    ]);
    // leftThumb.focus();
    // expect(document.hasFocus()).toEqual(true);
    await user.keyboard("[ArrowRight]");
    // fireEvent.pointerDown(leftThumb, { clientX: 0, clientY: 0});
    // fireEvent.pointerMove(leftThumb, { clientX: 100, clientY: 0 });
    // fireEvent.pointerUp(leftThumb);    

    // expect(leftThumb).toHaveAttribute('aria-valuenow', "1");

    // const  test  = getByText(/0/i);

    // const track = document.getElementById('slider-filled-track-2');
    // track.style.left = '12.5%';
    expect(leftThumb).toHaveAttribute('aria-valuenow', "10");
    // // Simulate changes to first slider
    // // fireEvent.change(sliders[0], { target: { value: 500 } });
    // sliders[0].setAttribute('aria-valuenow', 500);

    // // Check display value
    // expect(Number(sliders[0].getAttribute('aria-valuenow'))).toEqual(500);

    // const sliderContainer = document.getElementById('slider-root-2');
    // fireEvent.change(sliderContainer);


    // Check that the setter is called with it
    // fireEvent.change(sliders[0]);
    expect(setter).toHaveBeenCalledWith([500, 1000]);
    // expect(Number(sliders[1].getAttribute('aria-valuenow'))).toEqual(1000);
  });

  // test('Can switch to the next image', () => {
  //   const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages} />);
  //   const nextButton = getByLabelText(/Next Image/i);

  //   fireEvent.click(nextButton);

  //   const image = getByAltText('Image 1');
  //   expect(image).toBeInTheDocument();
  // });

  // test('Can switch to the previous image', () => {
  //   const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages} />);
  //   const previousButton = getByLabelText(/Previous Image/i);
  //   const nextButton = getByLabelText(/Next Image/i);

  //   fireEvent.click(nextButton);
  //   fireEvent.click(previousButton);

  //   const image = getByAltText('Image 0');
  //   expect(image).toBeInTheDocument();
  // });

  // test('Can loop from end to start seamlessly', () => {
  //   const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages} />);
  //   const nextButton = getByLabelText(/Next Image/i);

  //   // Click next button until the last image
  //   fireEvent.click(nextButton);
  //   fireEvent.click(nextButton);

  //   // Now, clicking next should show the first image again
  //   fireEvent.click(nextButton);

  //   const image = getByAltText('Image 0');
  //   expect(image).toBeInTheDocument();
  // });

  // test('Can loop from start to end seamlessly', () => {
  //   const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages} />);
  //   const previousButton = getByLabelText(/Previous Image/i);

  //   // Clicking previous should show the last image
  //   fireEvent.click(previousButton);

  //   const image = getByAltText('Image 2');
  //   expect(image).toBeInTheDocument();
  // });  
});
