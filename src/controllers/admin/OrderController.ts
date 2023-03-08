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
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { OrderInsert } from "../../models/OrderCreation";
import { Order } from "../../entities/OrderEntity";
import { QueryParamsModelOrderSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { orderService } from "../../services/adminService/OrderService";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";

@Controller("/order")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class OrderController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelOrderSearch,
    @Res() res: Response
  ) {
    const OrderData: Order[] = await orderService.getQuery(query);
    return Responses.resCount(res, OrderData);
  }

  @Post("/:orderId/update")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async update(
    @HeaderParams("token") token: string,
    @BodyParams("order") orderData: OrderInsert,
    @PathParams("orderId") orderId: number,
    @BodyParams("details", OrderDetailInsert) details: OrderDetailInsert[],
    @Res() res: Response
  ) {
    const data = await Order.findOne({where: {id: orderId}, relations: ["details"]})
    const newData = await Order.save({...data, ...orderData, details})
    return Responses.resOk(res, newData);
  }

  @Post("/:orderId/status/update")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async updateStatus(
    @HeaderParams("token") token: string,
    @BodyParams("status") status: string,
    @PathParams("orderId") orderId: number,
    @Res() res: Response
  ) {
    await Order.updateCondition({id: orderId}, {status})
    return Responses.resOk(res, {});
  }
}
