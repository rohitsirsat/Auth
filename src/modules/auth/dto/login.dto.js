import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto {
  static schema = Joi.object({
    username: Joi.string().trim().min(3).max(50).required(),
    password: Joi.string().required(),
  });
}

export default LoginDto;
