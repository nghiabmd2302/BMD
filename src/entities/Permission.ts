import { Core } from "../core/entity/Core";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Role } from "./Role";
@Entity("permission")
export class Permission extends Core {
  @Column()
  path: string;

  @Column()
  name: string;


  // async assignRole(roleId: number) {
  //   this.role = await Role.findOneAndThrow({ where: { id: roleId } }, roleId);
  // }

}
