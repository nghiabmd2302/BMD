import { Core } from "../core/entity/Core";
import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./Permission";

@Entity("role")
export class Role extends Core {
    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => Permission, (permissions) => permissions.role)
    permissions: Permission[]
}
