import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw ApiError.unauthorized("Not Authenticated");
  }

  const decodedToken = verifyAccessToken(token);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    throw ApiError.unauthorized("User no longer exists");
  }

  req.user = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  next();
};

const authorize = async (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden("You do not have to perform this action");
    }
    next();
  };
};

export { authenticate, authorize };
