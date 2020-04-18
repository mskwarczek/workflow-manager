import React from 'react';
import { render, fireEvent } from './config/test-utils';

import App from './App';

it('renders and navigation links work properly', () => {
  const { container, getByText } = render(<App />);
  fireEvent.click(getByText(/home page/i));
  expect(container.querySelector('#homePage')).toBeInTheDocument();
  fireEvent.click(getByText(/test page/i));
  expect(container.querySelector('#test')).toBeInTheDocument();
});
