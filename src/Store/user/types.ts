export const USER_ACTION_REQUEST = 'USER_ACTION_REQUEST';
export const USER_ACTION_FAILURE = 'USER_ACTION_FAILURE';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_OUT_SUCCESS = 'USER_SIGN_OUT_SUCCESS';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';

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

interface IUserActionRequest {
  type: typeof USER_ACTION_REQUEST;
};

interface IUserActionFailure {
  type: typeof USER_ACTION_FAILURE;
  error: string;
};

interface IRegisterUserSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  user: IUser;
};

interface ISignInUserSuccess {
  type: typeof USER_SIGN_IN_SUCCESS;
  user: IUser;
};

interface ISignOutUserSuccess {
  type: typeof USER_SIGN_OUT_SUCCESS;
};

interface IGetUserSuccess {
  type: typeof USER_GET_SUCCESS;
  user: IUser;
};

export type UserActionTypes =
  IUserActionRequest |
  IUserActionFailure |
  IRegisterUserSuccess |
  ISignInUserSuccess |
  ISignOutUserSuccess |
  IGetUserSuccess;
