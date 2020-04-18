import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render as rtlRender } from '@testing-library/react';

import { rootReducer } from '../Store/store'

function customRender(
  ui,
  {
    store = createStore(rootReducer),
    ...renderOptions
  } = {}
) {
  const history = createMemoryHistory();
  function Wrapper({ children }) {
    return(
      <Router history={history}>
        <Provider store={store}>
          {children}
        </Provider>
      </Router>
    )};
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
