import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Sidebar /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
