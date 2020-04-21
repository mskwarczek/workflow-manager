import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducers';

export const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
