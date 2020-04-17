import React from 'react';
import ReactDOM from 'react-dom';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('navigation links work properly', () => {
  const history = createMemoryHistory()
  const { container, getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  fireEvent.click(getByText(/home page/i));
  expect(container.querySelector('#homePage')).toBeInTheDocument();
  fireEvent.click(getByText(/test page/i));
  expect(container.querySelector('#test')).toBeInTheDocument();
});
