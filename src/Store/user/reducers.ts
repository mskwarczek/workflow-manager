import {
  IUserState,
  UserActionTypes,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SIGN_OUT_USER_REQUEST,
  SIGN_OUT_USER_SUCCESS,
  SIGN_OUT_USER_FAILURE,
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
    case REGISTER_USER_REQUEST:
    case SIGN_IN_USER_REQUEST:
    case GET_USER_REQUEST:
    case SIGN_OUT_USER_REQUEST: return {
      ...state,
      isLoading: true,
    };
    case REGISTER_USER_FAILURE:
    case SIGN_IN_USER_FAILURE:
    case GET_USER_FAILURE:
    case SIGN_OUT_USER_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.error,
    };
    case REGISTER_USER_SUCCESS:
    case SIGN_IN_USER_SUCCESS:
    case GET_USER_SUCCESS: return {
      ...state,
      ...action.user,
      isLoading: false,
      error: false,
    };
    case SIGN_OUT_USER_SUCCESS: return initialState;
    default: return state;
  };
};

export default userReducer;
