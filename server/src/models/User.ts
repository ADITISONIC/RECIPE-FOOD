import mongoose,{Document,Schema} from "mongoose";

/**
 * @typedef {Object} IUser
 * @property {string} email
 * @property {string} password
 */

export interface IUser extends Document{
  email : string;
  password : string;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User',UserSchema)
