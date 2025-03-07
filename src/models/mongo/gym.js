import Mongoose from "mongoose";

const { Schema } = Mongoose;

const gymSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true }, 
  capacity: { type: Number, min: 1, default: null },
  category: { type: String, required: true }, 
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Gym = Mongoose.model("Gym", gymSchema);
