import mongoose from 'mongoose';

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

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  isVerified: boolean;
  organizations: string[];
};

const User = mongoose.model<IUser, mongoose.Model<IUser>>('User', UserSchema);

module.exports = User;
export default User;
