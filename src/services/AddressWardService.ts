import { Like } from "typeorm";
import { AddressWard } from "../entities/AddressWard";
import { QueryParamsModelParentCode } from "../models/queryParamsModel";
class AddressWardService {
  async getQuery(query: QueryParamsModelParentCode): Promise<any> {
    const data: AddressWard[] = await AddressWard.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: { name: Like(`%${query.search || ""}%`), parentCode: query.parentCode },
    });
    const total = await AddressWard.count();
    return {
      data,
      total,
    };
  }
}

export const addressWardService = new AddressWardService();
