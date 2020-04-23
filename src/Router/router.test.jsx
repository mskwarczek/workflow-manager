import React from 'react';
import { render } from '../config/test-utils';

import Router from './router';

it('renders without crashing', () => {
  render(<Router />);
});
