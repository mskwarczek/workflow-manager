import mongoose from 'mongoose';

import { IUserDocument } from '../types';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  organizations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  }],
});

const User = mongoose.model<IUserDocument, mongoose.Model<IUserDocument>>('User', UserSchema);

module.exports = User;
export default User;
