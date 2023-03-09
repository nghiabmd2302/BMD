import { Like } from "typeorm";
import { News } from "../../entities/NewsEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
class NewsService {
  async getQuery(query: QueryParamsModel, recycle:boolean = false): Promise<any> {
    const { limit, page } = query;

    let options = {}
    if(recycle) {
        options = {
            ...options, 
            isDeleted: true
        }
    }

    const data: News[] = await News.findManyQuery({
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
      where: { title: Like(`%${query.search || ""}%`), ...options },
    });
    const total = await News.count();
    return {
      data,
      total,
    };
  }
}

export const newsService = new NewsService();
