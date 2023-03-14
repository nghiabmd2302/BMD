import { Like } from "typeorm";
import { Cover } from "../entities/Cover";
import { QueryParamsModel } from "../models/queryParamsModel";
class CoverService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const {search, limit, page} = query
    
    const data: Cover[] = await Cover.findManyQuery({
        where: {
            name: Like(`%${search || ""}%`),
        },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Cover.count();
    return {
      data,
      total,
    };
  }
}

export const coverService = new CoverService();
