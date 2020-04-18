import { createStore, combineReducers } from 'redux';

import userReducer from './user/reducers';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
