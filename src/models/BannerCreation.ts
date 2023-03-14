
import { Property, Default} from "@tsed/common";
import { Banner } from "../entities/Banner";

export class BannerInsert{
    @Property()
    @Default(true)
    isShow: Boolean

    @Property()
    thumbnail: string

    @Property()
    newsId: number

    @Property()
    promotionId: number

    async toBanner () {
        const banner = new Banner()
        banner.isShow = this.isShow
        banner.thumbnail = this.thumbnail
        await banner.assignNews(this.newsId)
        await banner.assignPromotion(this.promotionId)
        return banner
    }

}