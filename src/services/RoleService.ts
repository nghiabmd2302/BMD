import { PermissionInsert } from "../models/PermissionCreation";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import { RoleInsert } from "src/models/RoleCreation";
import { In } from "typeorm";

class RoleService {
  async create(permissionsData: PermissionInsert[]) {
    const adminRole: Role = await Role.findQuery({ where: { name: "admin" } });
    const permissions = await Promise.all(
      permissionsData.map((item) => {
        return item.toPermission();
      })
    );

    const permissionsSave = await Permission.save(permissions);
    adminRole.permissions = permissionsSave;
    const data = await Role.save({ ...adminRole });
    return data;
  }

  async update(
    permissionsData: PermissionInsert[],
    roleData: RoleInsert,
    roleId: number
  ) {
    const roleUpdate = roleData.toRole();
    const roleFound: Role = await Role.findQuery({ where: { id: roleId } });
    //for old permissions
    const permissions = await Promise.all(
      permissionsData.map((item) => {
        return Permission.findOne({where: {name: item.name}})
      })
    )
    roleUpdate.permissions = permissions

    // for new permissions
    // const permissions = await Promise.all(
    //   permissionsData.map((item) => {
    //     return item.toPermission();
    //   })
    // );
    // const permissionsSave = await Permission.save(permissions);
    // roleUpdate.permissions = permissionsSave;

    const data = await Role.save({ ...roleFound, ...roleUpdate });
    return data;
  }
}

export const roleService = new RoleService();
