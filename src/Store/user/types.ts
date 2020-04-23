export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const SIGN_IN_USER_REQUEST = 'SIGN_IN_USER_REQUEST';
export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
export const SIGN_IN_USER_FAILURE = 'SIGN_IN_USER_FAILURE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export interface IUserSignIn {
  email: string;
  password: string;
};

export interface IUserRegister extends IUserSignIn {
  firstName: string;
  lastName: string;
};

export interface IUser extends IUserRegister {
  _id: string;
  isVerified: boolean;
  organizations: string[];
};

export interface IUserState extends IUser {
  isLoading: boolean;
  error: boolean | string;
};

interface IRegisterUserRequest {
  type: typeof REGISTER_USER_REQUEST;
};

interface IRegisterUserSuccess {
  type: typeof REGISTER_USER_SUCCESS;
};

interface IRegisterUserFailure {
  type: typeof REGISTER_USER_FAILURE;
  error: string;
};

interface ISignInUserRequest {
  type: typeof SIGN_IN_USER_REQUEST;
};

interface ISignInUserSuccess {
  type: typeof SIGN_IN_USER_SUCCESS;
  user: IUser;
};

interface ISignInUserFailure {
  type: typeof SIGN_IN_USER_FAILURE;
  error: string;
};

interface IGetUserRequest {
  type: typeof GET_USER_REQUEST;
};

interface IGetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  user: IUser;
};

interface IGetUserFailure {
  type: typeof GET_USER_FAILURE;
  error: string;
};

export type UserActionTypes =
  IRegisterUserRequest | IRegisterUserSuccess |IRegisterUserFailure |
  ISignInUserRequest | ISignInUserSuccess | ISignInUserFailure |
  IGetUserRequest | IGetUserSuccess | IGetUserFailure;
