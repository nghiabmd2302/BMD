import {
  BodyParams,
  Controller,
  Post,
  Res,
  UseBefore,
  HeaderParams,
  QueryParams,
  Get,
  PathParams,
  Req
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { OrderInsert } from "../../models/OrderCreation";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";
import { Order } from "../../entities/OrderEntity";
import { Response, Request } from "express";
import { Responses } from "../../services/responseService/ResponseService";
import { orderService } from "../../services/customerService/OrderService";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";

@Controller("/order")
@UseAuth(CustomAuthMiddleware, { role: "customer" })
@Docs("/docs_customer")
export class OrderController {

  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @QueryParams("code", String) code: Array<string>,
    @Res() res: Response
  ) {
    const data = await orderService.getQuery(query, code)
    return Responses.resOk(res, data);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async create(
    @HeaderParams("token") token: string,
    @BodyParams("order") orderData: OrderInsert,
    @BodyParams("promotionCode") promotionCode: string,
    @BodyParams("expoToken") expoToken: string,
    @BodyParams("customerId") customer: number,
    @BodyParams("details", OrderDetailInsert) details: OrderDetailInsert[],
    @BodyParams("addressCityId") addressCity: number,
    @BodyParams("addressDistrictId") addressDistrict: number,
    @BodyParams("addressWardId") addressWard: number,
    @Res() res: Response
  ) {
    const data = await orderService.addNewOrder(orderData, details, promotionCode, addressCity, addressDistrict, addressWard, customer, expoToken)
    return Responses.resOk(res, data);
  }

  @Post("/:orderId/cancel")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async cancel(
    @HeaderParams("token") token: string,
    @PathParams("orderId") orderId: number,
    @Res() res: Response
    
  ) {
    await Order.updateCondition({id: orderId}, {status: "CANCEL"})
    return Responses.resOk(res, {});
  }

  
  @Post("/estimate")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async estimate(
    @HeaderParams("token") token: string,
    @BodyParams("order") orderData: OrderInsert,
    @BodyParams("promotionCode") promotionCode: string,
    @BodyParams("details", OrderDetailInsert) details: OrderDetailInsert[],
    @BodyParams("addressCityId") addressCity: number,
    @BodyParams("addressDistrictId") addressDistrict: number,
    @BodyParams("addressWardId") addressWard: number,
    @Res() res: Response,
    @Req() request: Request
  ) {
    // @ts-ignore
    const customer = request.user.id;
    const data = await orderService.addNewOrder(orderData, details, promotionCode, addressCity, addressDistrict, addressWard, customer)
    return Responses.resOk(res, data);
  }
  
}
