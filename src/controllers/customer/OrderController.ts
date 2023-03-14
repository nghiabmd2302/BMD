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
  Req,
  UseAuth
} from "@tsed/common";
import { VerificationJWT } from "../../middlewares/auth";
import { Docs } from "@tsed/swagger";
import { OrderInsert } from "../../models/OrderCreation";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";
import { Order } from "../../entities/Order";
import { Response, Request } from "express";
import { Responses } from "../../services/responseService/ResponseService";
import { orderService } from "../../services/OrderService";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";

@Controller("/order")
@Docs("/docs_customer")
export class OrderController {

  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @QueryParams("code", String) code: Array<string>,
    @Res() res: Response
  ) {
    const data = await orderService.getQuery(query, code)
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
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
    const data = await orderService.createOrder(orderData, details, addressCity, addressDistrict, addressWard, customer, promotionCode, expoToken)
    return Responses.sendOK(res, data);
  }

  @Post("/:orderId/cancel")
  @UseAuth(VerificationJWT)
  async cancel(
    @HeaderParams("token") token: string,
    @PathParams("orderId") orderId: number,
    @Res() res: Response
    
  ) {
    await Order.updateCondition({id: orderId}, {status: "CANCEL"})
    return Responses.sendOK(res, {});
  }

  
  @Post("/estimate")
  @UseAuth(VerificationJWT)
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
    const data = await orderService.createOrder(orderData, details, addressCity, addressDistrict, addressWard, customer, promotionCode)
    return Responses.sendOK(res, data);
  }
  
}
