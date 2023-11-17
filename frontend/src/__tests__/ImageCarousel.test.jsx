import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';

describe('ImageCarousel with multiple images', () => {
  const allImages = ['image0.jpg', 'image1.jpg', 'image2.jpg'];

  test('Can render', () => {
    render(<ImageCarousel allImages={allImages}/>);
  });

  test('Can switch to the next image', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const nextButton = getByLabelText(/Next Image/i);

    fireEvent.click(nextButton);

    const image = getByAltText('Image 1');
    expect(image).toBeInTheDocument();
  });

  test('Can switch to the previous image', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const previousButton = getByLabelText(/Previous Image/i);
    const nextButton = getByLabelText(/Next Image/i);

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    const image = getByAltText('Image 0');
    expect(image).toBeInTheDocument();
  });

  test('Can loop from end to start seamlessly', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const nextButton = getByLabelText(/Next Image/i);

    // Click next button until the last image
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    // Now, clicking next should show the first image again
    fireEvent.click(nextButton);

    const image = getByAltText('Image 0');
    expect(image).toBeInTheDocument();
  });

  test('Can loop from start to end seamlessly', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const previousButton = getByLabelText(/Previous Image/i);

    // Clicking previous should show the last image
    fireEvent.click(previousButton);

    const image = getByAltText('Image 2');
    expect(image).toBeInTheDocument();
  });
});

describe('ImageCarousel with single image (thumbnail)', () => {
  const allImages = ['thumbnail.jpg'];

  test('Can render', () => {
    render(<ImageCarousel allImages={allImages}/>);
  });

  // Buttons are hidden if it's a single image, but on the event that a user manages to trigger it
  // it should just loop back to Image 0 anyway
  test('Can switch to the next image', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const nextButton = getByLabelText(/Next Image/i);

    fireEvent.click(nextButton);

    const image = getByAltText('Image 0');
    expect(image).toBeInTheDocument();
  });

  test('Can switch to the previous image', () => {
    const { getByLabelText, getByAltText } = render(<ImageCarousel allImages={allImages}/>);
    const previousButton = getByLabelText(/Previous Image/i);
    const nextButton = getByLabelText(/Next Image/i);

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    const image = getByAltText('Image 0');
    expect(image).toBeInTheDocument();
  });
});
