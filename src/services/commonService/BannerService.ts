import { Banner } from "../../entities/BannerEntity";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
class BannerService {
  async getQuery(query: QueryParamsModelLessSearch): Promise<any> {
    const data: Banner[] = await Banner.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
    });
    const total = await Banner.count();
    return {
      data,
      total,
    };
  }
}

export const bannerService = new BannerService();
