import { Core } from "../core/entity/Core";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Grade } from "./Grade";
import { School } from "./School";
import { Teacher } from "./Teacher";
import { Customer } from "./Customer";

@Entity("configuration")
export class Configuration extends Core {
    @Column()
    param: string

    @Column()
    value: string

    @Column()
    note: string
}
