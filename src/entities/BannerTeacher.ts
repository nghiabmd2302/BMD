import { Core } from "../core/entity/Core";
import { Entity, Column, ManyToOne } from "typeorm";
import { News } from "./News";
import { Promotion } from "./Promotion";

@Entity("bannerteacher")
export class BannerTeacher extends Core {
  @Column()
  isShow: Boolean;

  @Column()
  isDeleted: Boolean;

  @Column()
  body: string;

  @Column()
  thumbnail: string;

  @Column()
  position: number;

  @Column()
  isOpenCustomerApp: boolean;

  @ManyToOne(() => News, () => News)
  news: News;

  @ManyToOne(() => Promotion, () => Promotion)
  promotion: Promotion;

  async assignNews(newsId: number) {
    this.news = await News.findOneAndThrow({ where: { id: newsId } }, newsId);
  }

  async assignPromotion(promotionId: number) {
    this.promotion = await Promotion.findOneAndThrow(
      { where: { id: promotionId } },
      promotionId
    );
  }
}
