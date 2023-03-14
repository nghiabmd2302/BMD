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
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Permission } from "../../entities/Permission";
import { PermissionInsert } from "../../models/PermissionCreation";
import { permissionService } from "../../services/PermissionService";

@Controller("/permission")
@Docs("/docs_admin")
export class PermissionController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const data = await permissionService.getQuery(query);
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @BodyParams("permission", PermissionInsert) permissionData: PermissionInsert,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await Permission.save(permissionData);
    return Responses.sendOK(res, data);
  }

  @Post("/:permissionId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("permission", PermissionInsert) permissionData: PermissionInsert,
    @HeaderParams("token") token: string,
    @PathParams("permissionId") permissionId: number,
    @Res() res: Response
  ) {
    await Permission.updateCondition({id: permissionId}, permissionData)
    return Responses.sendOK(res, {})
  }

  @Post("/:permissionId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: string,
    @PathParams("permissionId") permissionId: number,
    @Res() res: Response
  ) {
    await Permission.delete({id: permissionId})
    return Responses.sendOK(res, {})
  }


}
