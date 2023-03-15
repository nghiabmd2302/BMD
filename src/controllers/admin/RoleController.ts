import {
  BodyParams,
  Controller,
  Get,
  Post,
  HeaderParams,
  QueryParams,
  PathParams,
  Res,
  UseAuth,
} from "@tsed/common";
import { VerificationJWT } from "../../middlewares/auth";
import { Docs } from "@tsed/swagger";
import { RoleInsert } from "../../models/RoleCreation";
import { Role } from "../../entities/Role";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { Permission } from "../../entities/Permission";
import { PermissionInsert } from "../../models/PermissionCreation";
import { roleService } from "../../services/RoleService";

@Controller("/role")
@Docs("/docs_admin")
export class RoleController {
  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: string,
    @BodyParams("role") roleData: RoleInsert,
    @Res() res: Response
  ) {
    const role = roleData.toRole();
    const data = await Role.save(role);
    return Responses.sendOK(res, data);
  }

  @Get("/")
  @UseAuth(VerificationJWT)
  async get(@HeaderParams("token") token: string, @Res() res: Response) {
    const data = await Role.find({});
    return Responses.sendOK(res, data);
  }

  @Get("/permissions")
  @UseAuth(VerificationJWT)
  async getPermissions(
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await Permission.find({});
    return Responses.sendOK(res, data);
  }

  @Get("/:roleId")
  @UseAuth(VerificationJWT)
  async getOne(
    @HeaderParams("token") token: string,
    @PathParams("roleId") roleId: number,
    @Res() res: Response
  ) {
    const data = await Role.findQuery({
      relations: ["permissions"],
      where: { id: roleId },
    });
    return Responses.sendOK(res, data);
  }

  @Post("/permissions/import")
  @UseAuth(VerificationJWT)
  async import(
    @HeaderParams("token") token: string,
    @BodyParams("permissions", PermissionInsert)
    permissionsData: PermissionInsert[],
    @Res() res: Response
  ) {
    const data = await roleService.create(permissionsData);
    return Responses.sendOK(res, data);
  }

  @Post("/:roleId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: string,
    @PathParams("roleId") roleId: number,
    @BodyParams("permissions", PermissionInsert)
    permissionsData: PermissionInsert[],
    @BodyParams("info") roleData: RoleInsert,
    @Res() res: Response
  ) {
    const data = await roleService.update(permissionsData, roleData, roleId)
    return Responses.sendOK(res, data);
  }
}
