import mongoose from 'mongoose';

import { IUser } from '../src/Store/user/types';

export type IUserDocument = IUser & mongoose.Document;

export class ServerError {
  status: number;
  message?: string;
  payload?: object;

  constructor(status: number, message?: string, payload?: object) {
    this.status = status;
    this.message = message;
    this.payload = payload;
  };
};
