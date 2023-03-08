import { Request, Response, NextFunction } from "express";
export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";

  // @ts-ignore
  err.statusCode = err.statusCode || 500;

  // @ts-ignore
  err.data = err.data || {};

  // @ts-ignore
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    // @ts-ignore
    data: err.data,
  });
};
