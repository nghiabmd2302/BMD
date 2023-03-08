import { Like } from "typeorm";
import { AddressDistrict } from "../../entities/AddressDistrictEntity";
import { QueryParamsModel, QueryParamsModelParentCode } from "../../models/queryParamsModel";
class AddressDistrictService {
  async getQuery(query: QueryParamsModelParentCode): Promise<any> {
    const data: AddressDistrict[] = await AddressDistrict.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: { name: Like(`%${query.search || ""}%`), parentCode: query.parentCode},
    });
    const total = await AddressDistrict.count();
    return {
      data,
      total,
    };
  }
}

export const addressDistrictService = new AddressDistrictService();
