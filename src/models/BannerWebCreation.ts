import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm"
import { Property} from "@tsed/common";

export class BannerWebInsert{
    @Column({
        type: "boolean",
        default: true
    })
    @Property()
    isShow: Boolean

    @Column({
        type: "boolean",
        default: false
    })
    @Property()
    isDeleted: Boolean

    @Column()
    @Property()
    link: string

    @Column()
    @Property()
    thumbnail: string

    @Generated("increment")
    @Property()
    position: number

}