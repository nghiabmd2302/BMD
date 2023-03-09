import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  Res,
  UseAuth
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { OrderInsert } from "../../models/OrderCreation";
import { Order } from "../../entities/OrderEntity";
import { QueryParamsModelOrderSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { orderService } from "../../services/adminService/OrderService";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";

@Controller("/order")
@Docs("/docs_admin")
export class OrderController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelOrderSearch,
    @Res() res: Response
  ) {
    const OrderData: Order[] = await orderService.getQuery(query);
    return Responses.sendOK(res, OrderData);
  }

  @Post("/:orderId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: string,
    @BodyParams("order") orderData: OrderInsert,
    @PathParams("orderId") orderId: number,
    @BodyParams("details", OrderDetailInsert) details: OrderDetailInsert[],
    @Res() res: Response
  ) {
    const data = orderService.updateOrder(orderId, orderData, details)
    return Responses.sendOK(res, data);
  }

  @Post("/:orderId/status/update")
  @UseAuth(CustomAuthMiddleware, { role: "customer" })
  async updateStatus(
    @HeaderParams("token") token: string,
    @BodyParams("status") status: string,
    @PathParams("orderId") orderId: number,
    @Res() res: Response
  ) {
    await Order.updateCondition({id: orderId}, {status})
    return Responses.sendOK(res, {});
  }
}
