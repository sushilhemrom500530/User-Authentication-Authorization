import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  shops: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shops: { type: [String], required: true, unique: true }, // unique on shops array might need additional handling
});

export default mongoose.model<IUser>("User", UserSchema);
