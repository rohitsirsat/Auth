import User from "./auth.model.js";
import {
  generateAccessToke,
  generateRefreshToken,
  generateResetToken,
} from "../../common/utils/jwt.utils.js";
import ApiError from "../../common/utils/api-error.js";
import { sendVerificationEmail } from "../../common/config/email.js";

const register = async ({ username, email, password, role }) => {
  // check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  // generate tokens
  const { rawToken, hashedToken } = generateResetToken();

  // create user
  const user = await User.create({
    username,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  // send verification email
  try {
    await sendVerificationEmail(email, rawToken);
    console.log("verification token sent to email:", rawToken);
  } catch (error) {
    throw ApiError.serverError(error || "Failed to send verification email");
  }

  // send user
  const userObj = user.toObject();
  // delete password and token before sending res
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

export { register };
