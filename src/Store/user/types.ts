export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export interface IUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IUser {
  id: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
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
  user: IUser;
};

interface IRegisterUserFailure {
  type: typeof REGISTER_USER_FAILURE;
  error: string;
};

export type UserActionTypes =
  IRegisterUserRequest |
  IRegisterUserSuccess |
  IRegisterUserFailure;
