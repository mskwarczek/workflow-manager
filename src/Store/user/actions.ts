import {
  User,
  UserActionTypes,
  ADD_NEW_USER,
} from './types';

export const addNewUser = (userData: User): UserActionTypes => {
  return {
    type: ADD_NEW_USER,
    payload: userData,
  };
};
