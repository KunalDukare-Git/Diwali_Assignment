import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  address: {
    add_line1: {
      type: String,
      required: true
    },
    add_line2: {
      type: String,
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
  },
  mobile: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});
const user = mongoose.model("user", userSchema);
export default user;
