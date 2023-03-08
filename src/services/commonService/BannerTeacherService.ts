import { BannerTeacher } from "../../entities/BannerTeacherEntity";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
class BannerTeacherService {
  async getQuery(query: QueryParamsModelLessSearch): Promise<any> {
    const data: BannerTeacher[] = await BannerTeacher.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
    });
    const total = await BannerTeacher.count();
    return {
      data,
      total,
    };
  }
}

export const bannerTeacherService = new BannerTeacherService();
