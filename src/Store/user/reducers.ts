import {
  IUserState,
  UserActionTypes,
  USER_ACTION_REQUEST,
  USER_ACTION_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_GET_SUCCESS,
  USER_SIGN_OUT_SUCCESS,
} from './types';

const initialState: IUserState = {
  _id: '',
  isVerified: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organizations: [],
  isLoading: false,
  error: false,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): IUserState => {
  console.log('userReducer', state, action);
  switch (action.type) {
    case USER_ACTION_REQUEST: return {
      ...state,
      isLoading: true,
    };
    case USER_ACTION_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.error,
    };
    case USER_REGISTER_SUCCESS:
    case USER_SIGN_IN_SUCCESS:
    case USER_GET_SUCCESS: return {
      ...state,
      ...action.user,
      isLoading: false,
      error: false,
    };
    case USER_SIGN_OUT_SUCCESS: return initialState;
    default: return state;
  };
};

export default userReducer;
