export default class ErrorHander extends Error {
  constructor(name: string, message: string, statusCode: number, data: any) {
    super(message);
    // @ts-ignore
    this.statusCode = statusCode;

    // @ts-ignore
    this.data = data;

    // @ts-ignore
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}
