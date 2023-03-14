import { Property } from "@tsed/common";
import { Permission } from "../entities/Permission";

export class PermissionInsert {
    @Property()
    path: string;
  
    @Property()
    name: string;

    async toPermission() {
        const permission = new Permission()
        permission.path = this.path
        permission.name = this.name
        return permission
    }
}
