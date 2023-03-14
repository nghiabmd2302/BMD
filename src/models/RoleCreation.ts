import { Property } from "@tsed/common";
import { Role } from "../entities/Role";
export class RoleInsert {
  @Property()
  description: string

  @Property()
  name: string;

  toRole() {
    const role = new Role()
    role.description = this.description
    role.name = this.name
    return role
  }
}
