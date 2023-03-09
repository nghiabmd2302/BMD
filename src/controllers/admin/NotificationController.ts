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
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { NotificationInsert } from "../../models/NotificationCreation";
import { Notification } from "../../entities/NotificationEntity";
import { notificationService } from "../../services/adminService/NotificationService";

@Controller("/notification")
@Docs("/docs_admin")
export class NotificationController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const data = await notificationService.getQuery(query);
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @BodyParams("notification", NotificationInsert) notification: NotificationInsert,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await Notification.save(notification);
    return Responses.sendOK(res, data);
  }

  @Post("/:notificationId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("notification", NotificationInsert) notificationData: NotificationInsert,
    @HeaderParams("token") token: string,
    @PathParams("notificationId") notificationId: number,
    @Res() res: Response
  ) {
    await Notification.updateCondition({id: notificationId}, notificationData)
    return Responses.sendOK(res, {})
  }

  @Post("/:notificationId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: string,
    @PathParams("notificationId") notificationId: number,
    @Res() res: Response
  ) {
    await Notification.updateCondition({id: notificationId}, {isDeleted: true})
    return Responses.sendOK(res, {})
  }

  @Post("/:notificationId/notice")
  @UseAuth(VerificationJWT)
  async notice(
    @HeaderParams("token") token: string,
    @PathParams("notificationId") notificationId: number,
    @Res() res: Response
  ) {
    await Notification.updateCondition({id: notificationId}, {isNoticed: true})
    return Responses.sendOK(res, {})
  }


}
