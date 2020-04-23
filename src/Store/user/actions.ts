import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  IUser,
  IUserSignIn,
  IUserRegister,
  UserActionTypes,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
} from './types';

// Register user

export const registerUser = (user: IUserRegister): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(registerUserRequest());
    axios.post('/api/user/register', user)
      .then(response => dispatch(registerUserSuccess()))
      .catch(error => dispatch(registerUserFailure(error.response.data)));
  };
};

export const registerUserRequest = (): UserActionTypes => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

export const registerUserSuccess = (): UserActionTypes => {
  return {
    type: REGISTER_USER_SUCCESS,
  };
};

export const registerUserFailure = (error: string): UserActionTypes => {
  return {
    type: REGISTER_USER_FAILURE,
    error: error,
  };
};

// Sign in user

export const signInUser = (user: IUserSignIn): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(signInUserRequest());
    axios.post('/api/user/signin', user)
      .then(response => dispatch(signInUserSuccess(response.data)))
      .catch(error => dispatch(signInUserFailure(error.response.data)));
  };
};

export const signInUserRequest = (): UserActionTypes => {
  return {
    type: SIGN_IN_USER_REQUEST,
  };
};

export const signInUserSuccess = (user: IUser): UserActionTypes => {
  return {
    type: SIGN_IN_USER_SUCCESS,
    user,
  };
};

export const signInUserFailure = (error: string): UserActionTypes => {
  return {
    type: SIGN_IN_USER_FAILURE,
    error: error,
  };
};
