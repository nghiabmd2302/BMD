import { Like } from "typeorm";
import { Order } from "../../entities/OrderEntity";
import { QueryParamsModelOrderSearch } from "../../models/queryParamsModel";
class OrderService {
  async getQuery(query: QueryParamsModelOrderSearch): Promise<any> {
    const {
      search,
      limit,
      page,
      status,
      addressDistrictId,
      addressCityId,
      addressWardId,
      from,
      to,
    } = query;

    let condition = {};
    if (status !== undefined || status !== null) {
      condition = {
        ...condition,
        status,
      };
    }
    if (addressCityId !== undefined || addressCityId !== null) {
      condition = {
        ...condition,
        addressCity: addressCityId,
      };
    }
    if (addressDistrictId !== undefined || addressDistrictId !== null) {
      condition = {
        ...condition,
        addressDistrict: addressDistrictId,
      };
    }
    if (addressWardId !== undefined || addressWardId !== null) {
      condition = {
        ...condition,
        addressWard: addressWardId,
      };
    }

    const data: Order[] = await Order.findManyQuery({
      relations: {
        addressCity: true,
        addressDistrict: true,
        addressWard: true,
        customer: true,
        details: { book: true },
      },
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Order.count();
    return {
      data,
      total,
    };
  }
}

export const orderService = new OrderService();
