import {
  HeaderParams,
  IMiddleware,
  Middleware,
  Res,
  Req,
  Next,
  Context,
} from "@tsed/common";

import { Request } from "express";

import * as jwt from "jsonwebtoken";
import { Customer } from "../entities/Customer";
import Staff from "../entities/Staff";
import { Error } from "../services/errorService/ErrorService";

interface databaseLog {
  staffId: string;
  role: string;
}

@Middleware()
export class CustomAuthMiddleware implements IMiddleware {
  public async use(
    @Res() response: Res,
    @Req() request: Request,
    @Next() next: Next,
    @HeaderParams("token") token: string
  ) {
    //@ts-ignore
    const baseUrl = request.baseUrl;
    const segments = baseUrl.split("/");
    const role = segments[segments.length - 1];

    console.log(role);

    try {
      const dbLog: databaseLog = await jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      if (role !== dbLog.role) {
        throw Error.badRequest("Xác thực không hợp lệ!", {});
      }

      // get database table admin
      if (dbLog.role === "admin") {
        const staff = await Staff.findQuery({ where: { id: dbLog.staffId } });
        if (!staff) {
          throw Error.notFound("Staff not found!", {});
        }
        // @ts-ignore
        request.user = { id: staff.id };
      }
      // get database table customer
      else {
        const customer = await Customer.findQuery({
          where: { id: dbLog.staffId },
        });
        if (!customer) {
          throw Error.notFound("Customer not found!", {});
        }
        // @ts-ignore
        request.user = { id: customer.id };
      }
    } catch (err) {
      throw Error.badRequest(err.message, {});
    }
  }
}

@Middleware()
export class VerificationJWT{
  public async use(
    @Req() request: Request,
    @HeaderParams("token") token: string
  ) {
    //get role from router
    //@ts-ignore
    const baseUrl = request.baseUrl;
    const segments = baseUrl.split("/");
    const role = segments[2];

    //get database log 
    const dbLog: databaseLog = await jwt.verify(token, process.env.JWT_SECRET);
    if (role !== dbLog.role) {
      throw Error.badRequest("Xác thực không hợp lệ!", {});
    }

    // get database table admin
    if (dbLog.role === "admin") {
      const staff = await Staff.findQuery({ where: { id: dbLog.staffId } });
      if (!staff) {
        throw Error.notFound("Staff not found!", {});
      }
      // @ts-ignore
      request.user = { id: staff.id };
    }
    // get database table customer
    else {
      const customer = await Customer.findQuery({
        where: { id: dbLog.staffId },
      });
      if (!customer) {
        throw Error.notFound("Customer not found!", {});
      }
      // @ts-ignore
      request.user = { id: customer.id };
    }
  }
}
