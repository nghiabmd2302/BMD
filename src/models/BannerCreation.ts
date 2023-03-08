
import { Property, Default} from "@tsed/common";

export class BannerInsert{
    @Property()
    @Default(true)
    isShow: Boolean

    @Property()
    thumbnail: string

    @Property()
    newId: number

    @Property()
    promotionId: number
}