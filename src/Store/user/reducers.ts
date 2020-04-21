import {
  IUserState,
  UserActionTypes,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from './types';

const initialState: IUserState = {
  id: '',
  isVerified: false,
  firstName: '',
  lastName: '',
  email: '',
  organizations: [],
  isLoading: false,
  error: false,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): IUserState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: return {
      ...state,
      isLoading: true,
    };
    case REGISTER_USER_SUCCESS: return {
      ...state,
      ...action.user,
      isLoading: false,
      error: false
    };
    case REGISTER_USER_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.error,
    };
    default: return state;
  };
};

export default userReducer;
