const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";
import { Error } from "../services/errorService/ErrorService";

export function validateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errors = validationResult(req);
  let msg = "";
  if (!errors.isEmpty()) {
    msg = errors.array()[0].msg;
    throw Error.badRequest(msg, {});
  }
  next();
}
