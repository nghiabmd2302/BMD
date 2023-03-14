import { BannerWeb } from "../entities/BannerWeb";
import { QueryParamsModelLessSearch } from "../models/queryParamsModel";
class BannerWebService {
  async getQuery(query: QueryParamsModelLessSearch): Promise<any> {
    const data: BannerWeb[] = await BannerWeb.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
    });
    const total = await BannerWeb.count();
    return {
      data,
      total,
    };
  }
}

export const bannerWebService = new BannerWebService();
