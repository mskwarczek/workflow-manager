import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render as rtlRender } from '@testing-library/react';

import { rootReducer } from '../Store/store';

function customRender(
  ui,
  {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    ),
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
