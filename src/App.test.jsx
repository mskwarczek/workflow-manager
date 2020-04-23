import React from 'react';
import { render } from './config/test-utils';

import App from './App';

it('renders without crashing', () => {
  render(<App />);
});
