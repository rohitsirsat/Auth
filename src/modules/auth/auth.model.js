import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    require: [true, "Username is required"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    require: [true, "Email is required"],
  },

  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, "Password is required"],
  },

  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: { type: String, select: false },
  refreshToken: { type: String, select: false },
  resetPasswordtoken: { type: String, select: false },
  resetpasswordExpires: { type: Date, select: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (textPassword) {
  return bcrypt.compare(textPassword, this.password);
};

export default mongoose.model("User", userSchema);
