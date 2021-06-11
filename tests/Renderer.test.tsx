import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';

import Renderer from '../src/core/Renderer';
const mockFn = jest.fn();

it('Renders children', (): void => {
  const text = 'Testing';
  const { getByText } = render(<Renderer>{text}</Renderer>);
  expect(getByText(text)).toBeTruthy();
});

it('onClose works', (): void => {
  const text = 'Testing';
  const { getByText } = render(<Renderer onClose={mockFn}>{text}</Renderer>);
  expect(getByText(text)).toBeTruthy();

  act(() => {
    fireEvent.click(getByText(text));
  });

  expect(mockFn).toHaveBeenCalledTimes(1);
});
