import { Core } from "../core/entity/Core";
import { Entity, Column, Generated, ManyToOne } from "typeorm";
import { News } from "./News";
import { Promotion } from "./Promotion";

@Entity("banner")
export class Banner extends Core {
  @Column({
    type: "boolean",
    default: true,
  })
  isShow: Boolean;

  @Column()
  thumbnail: string;

  @Column()
  position: number;

  @ManyToOne(() => News, () => News)
  news: News;

  @ManyToOne(() => Promotion, () => Promotion)
  promotion: Promotion;

  async assignNews(newsId: number) {
    this.news = await News.findOneAndThrow({ where: { id: newsId } }, newsId);
  }

  async assignPromotion(promotionId: number) {
    this.promotion = await Promotion.findOneAndThrow({ where: { id: promotionId } }, promotionId);
  }
}
