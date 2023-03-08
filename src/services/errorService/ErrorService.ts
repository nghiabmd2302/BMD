import ErrorHander from "../../middlewares/ErrorHandler";

export class ErrorService {
  badRequest(msg: string, data: any = {}) {
    throw new ErrorHander("BAD REQUEST", msg, 400, data);
  }

  notFound(msg: string, data: any = {}) {
    throw new ErrorHander("NOT FOUND", msg, 400, data);
  }

  internalServer(msg: string, data: any = {}) {
    throw new ErrorHander("INTERNAL SERVER", msg, 500, data)
  }
}

export const Error = new ErrorService()