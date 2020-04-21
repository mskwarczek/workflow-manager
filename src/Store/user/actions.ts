import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  IUser,
  IUserForm,
  UserActionTypes,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from './types';

// Register user

export const registerUser = (user: IUserForm): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  console.log('registerUser', user);
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(registerUserRequest());
    axios.post('/api/user/register', { ...user })
      .then(response => dispatch(registerUserSuccess(response.data)))
      .catch(error => dispatch(registerUserFailure(error.response.data)));
  };
};

export const registerUserRequest = (): UserActionTypes => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

export const registerUserSuccess = (user: IUser): UserActionTypes => {
  return {
    type: REGISTER_USER_SUCCESS,
    user,
  };
};

export const registerUserFailure = (error: string): UserActionTypes => {
  console.log('error frontend', error);
  return {
    type: REGISTER_USER_FAILURE,
    error: error,
  };
};
