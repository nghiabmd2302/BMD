import { Like } from "typeorm";
import { Promotion } from "../../entities/PromotionEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
class PromotionService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const { search, limit, page } = query;

    const data: Promotion[] = await Promotion.findManyQuery({
      where: [
        {title: Like(`%${search || ""}%`)},
        {code: Like(`%${search || ""}%`)}
      ]
      ,
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Promotion.count();
    return {
      data,
      total,
    };
  }
}

export const promotionService = new PromotionService();
