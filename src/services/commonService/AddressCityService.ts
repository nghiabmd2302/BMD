import { Like } from "typeorm";
import { AddressCity } from "../../entities/AddressCityEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
class AddressCityService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const data: AddressCity[] = await AddressCity.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: [{ name: Like(`%${query.search || ""}%`) }],
    });
    const total = await AddressCity.count();
    return {
      data,
      total,
    };
  }
}

export const addressCityService = new AddressCityService();
