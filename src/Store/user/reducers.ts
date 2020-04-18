import {
  User,
  UserActionTypes,
  ADD_NEW_USER,
} from './types';

const initialState: User = {
  id: '',
  isVerified: false,
  firstName: '',
  lastName: '',
  email: '',
  organizations: [],
};

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): User => {
  switch (action.type) {
    case ADD_NEW_USER: return action.payload;
    default: return state;
  };
};

export default userReducer;
