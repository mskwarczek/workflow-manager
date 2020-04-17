import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import Router from './Router';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Router /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});