import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Permission } from "./Permission";
import {Staff} from "./Staff";

@Entity("role")
export class Role extends Core {
  @Column()
  name: string;

  @Column()
  description: string;
  
  @OneToMany(() => Staff, (staff) => staff.role)
  staffs: Staff[]

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]


}
