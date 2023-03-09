import { Like } from "typeorm";
import { Division } from "../../entities/DivisionEntity";
import { QueryParamsModelDivisionSearch } from "../../models/queryParamsModel";
class DivisionService {
  async getQuery(query: QueryParamsModelDivisionSearch): Promise<any> {
    const {limit, page, addressCityId, search = ""} = query
    let condition = {};
    if (addressCityId !== undefined || addressCityId !== null) {
      condition = {
        ...condition,
        addressCity: {
          id: addressCityId
        },
      };
    }
    const data: Division[] = await Division.findManyQuery({
      relations: ["addressCity"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Division.count();
    return {
      data,
      total,
    };
  }
}

export const divisionService = new DivisionService();
