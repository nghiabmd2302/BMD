import { Like } from "typeorm";
import { Publisher } from "../entities/Publisher";
import { QueryParamsModel } from "../models/queryParamsModel";
class PublisherService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const { search, limit, page } = query;

    const data: Publisher[] = await Publisher.findManyQuery({
      where: {
        name: Like(`%${search || ""}%`),
      },
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Publisher.count();
    return {
      data,
      total,
    };
  }
}

export const publisherService = new PublisherService();
