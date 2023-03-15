import {
  BodyParams,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseBefore,
  HeaderParams,
  UseAuth,
} from "@tsed/common";
import { generateToken } from "../../utils/jwt";
import { Customer } from "../../entities/Customer";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import {
  CustomerInsert,
  CustomerPassword,
  CustomerLogin,
} from "../../models/CustomerCreation";
import { comparePassword, hashPassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { Request } from "express";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { Error } from "../../services/errorService/ErrorService";
import { customerService } from "../../services/CustomerService";

export interface CustomerInfo {
  role: string;
  id: string;
}

@Controller("/auth")
@Docs("/docs_customer")
export class AuthController {
  @Post("/signup")
  async create(
    @BodyParams("customer") customerData: CustomerInsert,
    @BodyParams("facebookId") facebookId: string,
    @BodyParams("zaloId") zaloId: string,
    @BodyParams("googleId") googleId: string,
    @BodyParams("appleId") appleId: string,
    @Res() res: Res,
    @Req() req: Req
  ) {
    const data = await customerService.createCutomer(
      customerData,
      facebookId,
      googleId,
      zaloId,
      appleId
    );
    generateToken(data, res);
  }
  @Post("/login")
  async login(
    @BodyParams() data: CustomerLogin,
    @Req() req: Req,
    @Res() res: Response
  ) {
    const customer = await Customer.findQuery({
      select: ["username", "password", "code", "id"],
      where: { username: data.username },
    });
    await comparePassword(data.password, customer.password);
    generateToken(customer, res);
  }

  @Post("/social")
  async social(
    @BodyParams("facebookId") facebookId: string,
    @BodyParams("zaloId") zaloId: string,
    @BodyParams("googleId") googleId: string,
    @BodyParams("appleId") appleId: string,

    @Req() req: Request,
    @Res() res: Response
  ) {
    await customerService.social(res, facebookId, zaloId, appleId, googleId);
  }

  @Get("/profile")
  @UseAuth(VerificationJWT)
  async profile(
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    // @ts-ignore
    const customerId = request.user.id;
    const customerData = await Customer.findQuery({
      where: { id: customerId },
    });
    return Responses.sendOK(res, customerData);
  }

  @Post("/profile/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("customer") customerData: CustomerInsert,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    const customerId = request.user.id;
    const data = await customerService.updateCustomer(customerData, customerId);
    return Responses.sendOK(res, data);
  }

  @Post("/profile/password/update")
  @UseAuth(VerificationJWT)
  async passwordUpdate(
    @BodyParams() customer: CustomerPassword,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    const customerId = request.user.id;
    const data = await customerService.updatePassword(customer, customerId);
    return Responses.sendOK(res, data);
  }
}
