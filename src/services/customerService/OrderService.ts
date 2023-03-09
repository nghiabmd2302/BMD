import { OrderInsert } from "../../models/OrderCreation";
import { In, Like } from "typeorm";
import { Order } from "../../entities/OrderEntity";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { OrderDetailInsert } from "../../models/OrderDetailCreation";
import { Book } from "../../entities/BookEntity";
import { AddressCity } from "../../entities/AddressCityEntity";
import { Promotion } from "../../entities/PromotionEntity";
class OrderService {
  async getQuery(query: QueryParamsModelLessSearch, code: Array<string>): Promise<any> {
    const {page, limit} = query
    let options = {}
    if(code) {
      options = {
        where: {code: In(code)}
      }
    }

    const data: Order[] = await Order.findManyQuery({
      relations: {
        addressCity: true,
        addressDistrict: true,
        addressWard: true,
        customer: true,
        details: { book: true },
      },
      ...options,
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

  async  addNewOrder(
    orderData: OrderInsert,
    details: OrderDetailInsert[],
    promotionCode: string,
    addressCity: number,
    addressDistrict: number,
    addressWard: number,
    customer: any,
    expoToken: string = "",
  ): Promise<any> {
    const moneyTotal = await this.sumArrayValues(details);
    const addressCityData: AddressCity = await AddressCity.findOne({where: {id: addressCity}})
    const moneyDistance = addressCityData.feeDelivery
    const {value, type} = await Promotion.findOne({where: {code: promotionCode}})
    let moneyDiscount = 0
    if(type==='PERCENT') {
      moneyDiscount = moneyTotal * value / 100
    }
    const moneyFinal = moneyTotal + moneyDistance - moneyDiscount

    const data = await Order.save({...orderData, details, expoToken, customer, promotionCode, addressCity, addressDistrict, addressWard, moneyTotal, moneyDiscount, moneyDistance, moneyFinal})
    return data
  }
}

export const orderService = new OrderService();
