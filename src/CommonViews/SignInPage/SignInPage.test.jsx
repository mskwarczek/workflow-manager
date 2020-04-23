import React from 'react';
import { render } from '../../config/test-utils';

import SignInPage from './SignInPage';

it('renders without crashing', () => {
  const { queryByTestId } = render(<SignInPage />);
  expect(queryByTestId('email')).toBeInTheDocument();
  expect(queryByTestId('password')).toBeInTheDocument();
});
