import React from 'react';
import { render, fireEvent } from '../../config/test-utils';

import RegisterPage from './RegisterPage';

const fieldsChangeAndLengthValidation = (field, queryByTestId) => {
  fireEvent.change(queryByTestId(field), { target: { value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbb' } });
  expect(queryByTestId(field).value).toBe('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  expect(queryByTestId('errorMsg')).toBeInTheDocument();
  fireEvent.change(queryByTestId(field), { target: { value: 'Chuck' } });
  expect(queryByTestId(field).value).toBe('Chuck');
  expect(queryByTestId('errorMsg')).toBeNull();
};

it('renders properly, fills and validates max length of all form fields', () => {
  const { queryByTestId } = render(<RegisterPage />);
  fieldsChangeAndLengthValidation('firstName', queryByTestId);
  fieldsChangeAndLengthValidation('lastName', queryByTestId);
  fieldsChangeAndLengthValidation('email', queryByTestId);
  fieldsChangeAndLengthValidation('password', queryByTestId);
  fieldsChangeAndLengthValidation('confirmPassword', queryByTestId);
});

const fillFormWithValidData = queryByTestId => {
  fireEvent.change(queryByTestId('firstName'), { target: { value: 'Chuck' } });
  fireEvent.change(queryByTestId('lastName'), { target: { value: 'Norris' } });
  fireEvent.change(queryByTestId('email'), { target: { value: 'chuck@norris.com' } });
  fireEvent.change(queryByTestId('password'), { target: { value: 'roundhousekick' } });
  fireEvent.change(queryByTestId('confirmPassword'), { target: { value: 'roundhousekick' } });
};

it('validates email address on submit', () => {
  const { queryByTestId } = render(<RegisterPage />);
  fillFormWithValidData(queryByTestId);
  fireEvent.change(queryByTestId('email'), { target: { value: 'chucknorris.com' } });
  fireEvent.click(queryByTestId('submit'));
  expect(queryByTestId('errorMsg')).toBeInTheDocument();
});

it('validates password and confirmPassword address on submit', () => {
  const { queryByTestId } = render(<RegisterPage />);
  fillFormWithValidData(queryByTestId);
  fireEvent.change(queryByTestId('confirmPassword'), { target: { value: 'roundhousekicks' } });
  fireEvent.click(queryByTestId('submit'));
  expect(queryByTestId('errorMsg')).toBeInTheDocument();
});

// it('on click submit button sends complete user data to server', () => {
//   
// });