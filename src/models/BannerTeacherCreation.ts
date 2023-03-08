import { Property} from "@tsed/common";

export class BannerTeacherInsert{
    @Property()
    isShow: Boolean

    @Property()
    isDeleted: Boolean

    @Property()
    body: string

    @Property()
    thumbnail: string

    @Property()
    position: number

    @Property()
    isOpenCustomerApp: boolean

    @Property()
    newId: number

    @Property()
    promotionId: number

}