import { Core } from "../core/entity/Core"
import { Entity, Column} from "typeorm"


@Entity("bannerteacher")
export class BannerTeacher extends Core{
    @Column()
    isShow: Boolean

    @Column()
    isDeleted: Boolean

    @Column()
    body: string

    @Column()
    thumbnail: string

    @Column({default: 0})
    position: number

    @Column()
    isOpenCustomerApp: boolean

    @Column({default: 0})
    newId: number

    @Column({default: 0})
    promotionId: number
}