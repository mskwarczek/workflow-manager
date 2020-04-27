import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import {
  IError,
  IUser,
  IUserSignIn,
  IUserRegister,
  UserActionTypes,
  USER_ACTION_REQUEST,
  USER_ACTION_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_SUCCESS,
  USER_GET_SUCCESS,
} from './types';

// Common actions

export const userActionRequest = (): UserActionTypes => {
  return {
    type: USER_ACTION_REQUEST,
  };
};

export const userActionFailure = (error: IError): UserActionTypes => {
  return {
    type: USER_ACTION_FAILURE,
    error,
  };
};

// Register user

export const registerUser = (user: IUserRegister): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(userActionRequest());
    axios.post('/api/user/register', user)
      .then(response => dispatch(registerUserSuccess(response.data)))
      .catch(error => dispatch(userActionFailure(error.response)));
  };
};

export const registerUserSuccess = (user: IUser): UserActionTypes => {
  return {
    type: USER_REGISTER_SUCCESS,
    user,
  };
};

// Sign in user

export const signInUser = (user: IUserSignIn): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(userActionRequest());
    axios.post('/api/user/signin', user)
      .then(response => dispatch(signInUserSuccess(response.data)))
      .catch(error => dispatch(userActionFailure(error.response)));
  };
};

export const signInUserSuccess = (user: IUser): UserActionTypes => {
  return {
    type: USER_SIGN_IN_SUCCESS,
    user,
  };
};

// Sign out user

export const signOutUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(userActionRequest());
    axios.post('/api/user/signout')
      .then(response => dispatch(signOutUserSuccess()))
      .catch(error => dispatch(userActionFailure(error.response)));
  };
};

export const signOutUserSuccess = (): UserActionTypes => {
  return {
    type: USER_SIGN_OUT_SUCCESS,
  };
};

// Get user

export const getUser = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(userActionRequest());
    axios.get('/api/user')
      .then(response => dispatch(getUserSuccess(response.data)))
      .catch(error => dispatch(userActionFailure(error.response)));
  };
};

export const getUserSuccess = (user: IUser): UserActionTypes => {
  return {
    type: USER_GET_SUCCESS,
    user,
  };
};
