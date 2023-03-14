import { OrderInsert } from "../models/OrderCreation";
import { getManager, In, Like } from "typeorm";
import { Order } from "../entities/Order";
import {
  QueryParamsModelLessSearch,
  QueryParamsModelOrderSearch,
} from "../models/queryParamsModel";
import { OrderDetailInsert } from "../models/OrderDetailCreation";
import { Book } from "../entities/Book";
import { AddressCity } from "../entities/AddressCity";
import { Promotion } from "../entities/Promotion";
import { OrderDetail } from "../entities/OrderDetail";
import { Error } from "./errorService/ErrorService";
import AppDataSource from "../utils/data-source";
export enum Status {
  PENDING = "PENDING",
  FAIL = "FAIL",
  COMPLETE = "COMPLETE",
  REFUND = "REFUND",
}

class OrderService {
  async getQuery(
    query: QueryParamsModelLessSearch,
    code: Array<string>
  ): Promise<any> {
    const { page, limit } = query;
    let options = {};
    if (code) {
      options = {
        where: { code: In(code) },
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

  async getQueryAdmin(query: QueryParamsModelOrderSearch): Promise<any> {
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

  async sumArrayValues(data: any): Promise<number> {
    const sum = await data.reduce(async (prevValue, currentValue) => {
      const bookData: Book = await Book.findQuery({
        where: { id: currentValue.book },
      });
      const result =
        (await prevValue) + bookData.finalPrice * currentValue.quantity;
      return Promise.resolve(result);
    }, Promise.resolve(0));

    return sum;
  }

  async createOrder(
    orderData: OrderInsert,
    details: OrderDetailInsert[],
    addressCity: number,
    addressDistrict: number,
    addressWard: number,
    customer: any,
    promotionCode: string = "",
    expoToken: string = ""
  ): Promise<any> {
    const order = orderData.toOrder();
    //get order detail from query request
    const orderDetail = await Promise.all(
      details.map((item) => {
        return item.toOrderDetail();
      })
    );

    //get mutiple entity and check them exist
    await order.assignAddressCity(addressCity);
    await order.assignAddressDistrict(addressDistrict);
    await order.assignAddressWard(addressWard);
    await order.assignCustomer(customer);
    order.expoToken = expoToken;

    //caculator moneyTotal
    const moneyTotal = await this.sumArrayValues(details);

    //caculator moneyDistance
    const addressCityData: AddressCity = await AddressCity.findOne({
      where: { id: addressCity },
    });
    const moneyDistance = addressCityData.feeDelivery;

    //caculator moneyDiscount
    let moneyDiscount = 0;
    if (promotionCode) {
      const promotion: Promotion = await Promotion.findOne({
        where: { code: promotionCode },
      });

      if (promotion) {
        const date = new Date();
        const millisecondsNow: number = date.getTime();
        if (millisecondsNow <= promotion.endAt) {
          if (promotion.type === "PERCENT" && promotion.value) {
            moneyDiscount = (moneyTotal * promotion.value) / 100;
          }
        } else {
          return Error.badRequest("Mã khuyễn mãi này đã hết hạn!", {});
        }
      } else {
        return Error.badRequest("Không có mã khuyến mãi này!", {});
      }
    }

    //caculator moneyFinal
    const moneyFinal = moneyTotal + moneyDistance - moneyDiscount;

    //add some fields to order
    order.moneyDiscount = moneyDiscount;
    order.moneyDistance = moneyDistance;
    order.moneyFinal = moneyFinal;
    order.moneyTotal = moneyTotal;

    order.details = orderDetail;

    //transaction to save orderDetail and order
    try {
      const dataSave = await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          return await Promise.all([
            await transactionalEntityManager.save(OrderDetail, orderDetail),
            await transactionalEntityManager.save(Order, order),
          ])
        }
      );
      return dataSave[1];
    } catch (err) {
      return Error.internalServer(err.message, {});
    }
  }

  async updateOrder(
    orderId: number,
    orderData: OrderInsert,
    details: OrderDetailInsert[]
  ) {
    const options = {
      relations: {
        addressCity: true,
        addressDistrict: true,
        addressWard: true,
        customer: true,
        details: { book: true },
      },
      where: { id: orderId },
    };

    const order = orderData.toOrder();

    const orderDetail = await Promise.all(
      details.map((item) => {
        return item.toOrderDetail();
      })
    );

    const orderFound: Order = await Order.findOneAndThrow(options);

    //caculator moneyTotal
    const moneyTotal = await this.sumArrayValues(details);

    //caculator moneyDistance
    let moneyDistance = orderFound.moneyDistance;

    //caculator moneyDiscount
    let moneyDiscount = 0;
    if (orderFound.promotionCode) {
      const promotion = await Promotion.findOne({
        where: { code: orderFound.promotionCode },
      });

      if (promotion) {
        if (promotion.type === "PERCENT" && promotion.value) {
          moneyDiscount = (moneyTotal * promotion.value) / 100;
        }
      } else {
        return Error.badRequest("Không có mã khuyến mãi này!", {});
      }
    }

    //caculator moneyFinal
    const moneyFinal = moneyTotal + moneyDistance - moneyDiscount;

    //add some fields to order
    order.moneyDiscount = moneyDiscount;
    order.moneyDistance = moneyDistance;
    order.moneyFinal = moneyFinal;
    order.moneyTotal = moneyTotal;
    order.details = orderDetail;

    //transaction to save orderDetail and order
    try {
      const dataSave = await AppDataSource.transaction(
        async (transactionalEntityManager) => {
          return await Promise.all([
            await transactionalEntityManager.save(OrderDetail, orderDetail),
            await transactionalEntityManager.save(Order, {...orderFound, ...order}),
          ])
        }
      );
      return dataSave[1];
    } catch (err) {
      return Error.internalServer(err.message, {});
    }
  }
}

export const orderService = new OrderService();
