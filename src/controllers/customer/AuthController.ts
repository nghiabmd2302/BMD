import {
  BodyParams,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseBefore,
  HeaderParams,
} from "@tsed/common";
import { generateToken } from "../../utils/jwt";
import { Customer } from "../../entities/CustomerEntity";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import {
  CustomerInsert,
  CustomerPassword,
  CustomerLogin,
} from "../../models/CustomerCreation";
import { comparePassword, hashPassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { Request } from "express";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { Error } from "../../services/errorService/ErrorService";

export interface CustomerInfo {
  role: string;
  id: string;
}

@Controller("/auth")
@UseAuth(CustomAuthMiddleware, { role: "customer" })
@Docs("/docs_customer")
export class AuthController {
  @Post("/signup")
  async create(
    @BodyParams("customer")customerData: CustomerInsert,
    @BodyParams("facebookId") facebookId: string,
    @BodyParams("zaloId") zaloId: string,
    @BodyParams("googleId") googleId: string,
    @BodyParams("appleId") appleId: string,
    @Res() res: Res,
    @Req() req: Req
  ) {
      const password = await hashPassword(customerData.password)
      const data = await Customer.save({...customerData, facebookId, zaloId, googleId, appleId, password})
      generateToken(data, res)
  }
  @Post("/login")
  async login(
    @BodyParams() data: CustomerLogin,
    @Req() req: Req,
    @Res() res: Res
  ) {
    const customer = await Customer.findQuery({
      select: ["username", "password", "code", "id"],
      where: { username: data.username },
    });
    await comparePassword(data.password, customer.password);
    generateToken(customer, res);
  }

  @Get("/profile")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async profile(
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {

    // @ts-ignore
    const customerId = request.user.id;
    const customerData = await Customer.findQuery({ where: { id: customerId } });
    return Responses.resOk(res, customerData);
  }

  @Post("/profile/update")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async update(
    @BodyParams("customer") customer: CustomerInsert,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    const customerId = request.user.id;
    const customerData = await Customer.findQuery({
      select: ["username", "password", "code", "id"],
      where: { id: customerId },
    });
    const password = await hashPassword(customerData.password)
    await Customer.updateCondition({id: customerId}, {...customer, password})
    return Responses.resOk(res, {});
  }

  @Post("/profile/password/update")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async passwordUpdate(
    @BodyParams() customer: CustomerPassword,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    if (customer.oldPassword === customer.newPassword) {
      return Error.badRequest("Mật khẩu mới không được trùng mật khẩu cũ!")
    }

    const customerId = request.user.id;

    const customerFound: Customer = await Customer.findQuery({
      select: ["username", "password", "code", "id"],
      where: { id: customerId },
    });

    await comparePassword(customer.oldPassword, customerFound.password)

    let password = await hashPassword(customer.newPassword);
    await Customer.updateCondition({id: customerId}, {password})
    return Responses.resOk(res, {});
  }
}