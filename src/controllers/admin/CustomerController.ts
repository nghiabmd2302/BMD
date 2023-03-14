import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  PathParams,
  Res,
  QueryParams,
  UseAuth
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { Customer } from "../../entities/Customer";
import { CustomerInsert, CustomerUpdate } from "../../models/CustomerCreation";
import { hashPassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { QueryParamsModelCustomerSearch } from "../../models/queryParamsModel";
import { customerService } from "../../services/CustomerService";

@Controller("/customer")
@Docs("/docs_admin")
export class CustomerController {

  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @QueryParams() query: QueryParamsModelCustomerSearch,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await customerService.getQuery(query)
    return Responses.sendOK(res, data)
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @BodyParams("customer") customerData: CustomerInsert,
    @BodyParams("classroomId") classroomId: number,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await Customer.save({...customerData, classroom: classroomId})
    return Responses.sendOK(res, data)
  }

  @Get("/:customerId")
  @UseAuth(VerificationJWT)
  async getByID(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    const data = await Customer.findQuery({id: customerId})
    return Responses.sendOK(res, data)
  }

  @Post("/:customerId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("customer") customerData: CustomerUpdate,
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @BodyParams("classroomId") classroomId: number,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, customerData)
    return Responses.sendOK(res, {})
  }

  @Post("/:customerId/update/password")
  @UseAuth(VerificationJWT)
  async updatePassword(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @BodyParams("password") password: string,
    @Res() res: Response
  ) {
    let newPassword = await hashPassword(password)
    await Customer.updateCondition({id: customerId}, {password: newPassword})
    return Responses.sendOK(res, {})
  }

  @Post("/:customerId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, {isDeleted: true})
    return Responses.sendOK(res, {})
  }

  @Post("/:customerId/restore")
  @UseAuth(VerificationJWT)
  async restore(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, {isDeleted: false})
    return Responses.sendOK(res, {})
  }
}
