import { Like } from "typeorm";
import { Order } from "../../entities/OrderEntity";
import { QueryParamsModelOrderSearch } from "../../models/queryParamsModel";
import { OrderInsert } from "../../models/OrderCreation";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";
import { Book } from "../../entities/BookEntity";
import { AddressCity } from "../../entities/AddressCityEntity";
import { Promotion } from "../../entities/PromotionEntity";
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

  async  sumArrayValues(data: any): Promise<number> {
    const sum = await data.reduce(async (prevValue, currentValue) => {
      const bookData: Book = await Book.findQuery({where: {id: currentValue.book}})
      const result = await prevValue + bookData.finalPrice * currentValue.quantity;
      return Promise.resolve(result);
    }, Promise.resolve(0));
    
    return sum;
  }

  async updateOrder(
    orderId: number,
    orderData: OrderInsert,
    details: OrderDetailInsert[],
  ): Promise<any> {
    const oldOrderData: Order = await Order.findOne({where: {id: orderId}, relations: ["addressDistrict","addressCity","addressWard","customer"]})
    const moneyTotal = await this.sumArrayValues(details);

    const {value, type} = await Promotion.findOne({where: {code: oldOrderData.promotionCode}})
    let moneyDiscount = 0
    if(type==='PERCENT') {
      moneyDiscount = moneyTotal * value / 100
    }

    const moneyDistance = oldOrderData.moneyDistance
    const moneyFinal = moneyTotal + moneyDistance - moneyDiscount

    const data = await Order.save({...oldOrderData ,...orderData, details, moneyTotal, moneyDiscount, moneyDistance, moneyFinal})
    return data
  }

}

export const orderService = new OrderService();
