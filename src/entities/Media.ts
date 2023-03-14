import { Entity, Column} from "typeorm"
import { Core } from "../core/entity/Core";

@Entity("media")
export class Media extends Core{
    @Column()
    name: string

    @Column()
    thumbnail: string

    @Column({default: false})
    isDeleted: boolean

}