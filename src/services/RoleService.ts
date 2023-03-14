import { Like } from "typeorm";
import { Media } from "../entities/Media";
import { QueryParamsModel } from "../models/queryParamsModel";
import { Error } from "./errorService/ErrorService";
import { Responses } from "./responseService/ResponseService";
import { Response } from "express";
import { PermissionInsert } from "../models/PermissionCreation";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

class RoleService {
  async create(permissionsData: PermissionInsert[]) {
    const adminRole: Role = await Role.findQuery({ where: { name: "admin" } });
    const permissions = await Promise.all(
      permissionsData.map((item) => {
        return item.toPermission();
      })
    );

    const permissionsSave = await Permission.save(permissions)
    adminRole.permissions = permissionsSave;
    const data = await Role.save({ ...adminRole });
    return data;
  }
}

export const roleService = new RoleService();
