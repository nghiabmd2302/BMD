import { Core } from "../core/entity/Core";
import { Column, Entity } from "typeorm";
@Entity("permission")
export class Permission extends Core {
  @Column()
  path: string;

  @Column()
  name: string;
}
