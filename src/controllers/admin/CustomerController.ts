import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  PathParams,
  Res,
  QueryParams
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { Customer } from "../../entities/CustomerEntity";
import { CustomerInsert, CustomerUpdate } from "../../models/CustomerCreation";
import { hashPassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { QueryParamsModelCustomerSearch } from "../../models/queryParamsModel";
import { customerService } from "../../services/adminService/CustomerService";

@Controller("/customer")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class CustomerController {

  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @QueryParams() query: QueryParamsModelCustomerSearch,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await customerService.getQuery(query)
    return Responses.resCount(res, data)
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @BodyParams("customer") customerData: CustomerInsert,
    @BodyParams("classroomId") classroomId: number,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await Customer.save({...customerData, classroom: classroomId})
    return Responses.resOk(res, data)
  }

  @Get("/:customerId")
  @UseAuth(CustomAuthMiddleware, { role: "admin" })
  async getByID(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    const data = await Customer.findQuery({id: customerId})
    return Responses.resOk(res, data)
  }

  @Post("/:customerId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("customer") customerData: CustomerUpdate,
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @BodyParams("classroomId") classroomId: number,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, customerData)
    return Responses.resOk(res, {})
  }

  @Post("/:customerId/update/password")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async updatePassword(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @BodyParams("password") password: string,
    @Res() res: Response
  ) {
    let newPassword = await hashPassword(password)
    await Customer.updateCondition({id: customerId}, {password: newPassword})
    return Responses.resOk(res, {})
  }

  @Post("/:customerId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, {isDeleted: true})
    return Responses.resOk(res, {})
  }

  @Post("/:customerId/restore")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async restore(
    @HeaderParams("token") token: string,
    @PathParams("customerId") customerId: string,
    @Res() res: Response
  ) {
    await Customer.updateCondition({id: customerId}, {isDeleted: false})
    return Responses.resOk(res, {})
  }
}
