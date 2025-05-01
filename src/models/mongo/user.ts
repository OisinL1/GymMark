import { Schema, model } from "mongoose";
import { userType } from "../../types/gymmark-types"; // Adjust path as needed

const userSchema = new Schema<userType>({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  isAdmin:   { type: Boolean, default: false },
});

export const User = model<userType>("User", userSchema);
