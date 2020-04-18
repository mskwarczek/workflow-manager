export const ADD_NEW_USER = 'ADD_NEW_USER';

export interface User {
  id: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  organizations: string[];
};

interface addNewUserAction {
  type: typeof ADD_NEW_USER;
  payload: User;
};

export type UserActionTypes = addNewUserAction;
