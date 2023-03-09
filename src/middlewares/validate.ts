import { Request, Response, NextFunction } from "express";
import { Error } from "../services/errorService/ErrorService";
import * as Joi from "joi";

export function Validator(joiObjectSchema: object): any {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const { error } = Joi.object(joiObjectSchema).unknown().messages(viErrorMessages).validate(req.body);
    const valid = error == null;

    if (valid) {
      //@ts-ignore
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      //@ts-ignore
      return Error.badRequest(message.replace(/\"/g, ''), {});
    }
  };
}

export const viErrorMessages = {
  "string.empty": "Vui lòng nhập giá trị cho {#label}",
  "string.min": "{#label} Vui lòng nhập ít nhất {#limit} ký tự",
  "string.max": "{#label} nhập tối đa {#limit} ký tự",
  "number.min": "Vui lòng nhập số lớn hơn hoặc bằng {#limit}",
  "number.max": "Vui lòng nhập số nhỏ hơn hoặc bằng {#limit}",
};
