import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  photo: String,
   creditBalance: {
    type: Number,
    default: 5,  // ✅ This ensures default value even if not passed explicitly
  },
});

export default mongoose.model("User", userSchema);
