import { Property} from "@tsed/common";
import { BannerTeacher } from "../entities/BannerTeacher";

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

    async toBannerTeacher () {
        const bannerTeacher = new BannerTeacher()
        bannerTeacher.isShow = this.isShow
        bannerTeacher.thumbnail = this.thumbnail
        bannerTeacher.isDeleted = this.isDeleted
        bannerTeacher.body = this.body
        bannerTeacher.position = this.position
        bannerTeacher.isOpenCustomerApp = this.isOpenCustomerApp
        await bannerTeacher.assignNews(this.newId)
        await bannerTeacher.assignPromotion(this.promotionId)
        return bannerTeacher
    }

}