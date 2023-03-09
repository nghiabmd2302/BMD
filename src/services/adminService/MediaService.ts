import { Like } from "typeorm";
import { Media } from "../../entities/MediaEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
class MediaService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const data: Media[] = await Media.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: [{ name: Like(`%${query.search || ""}%`) }],
    });
    const total = await Media.count();
    return {
      data,
      total,
    };
  }
}

export const mediaService = new MediaService();
