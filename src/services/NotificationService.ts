import { Like } from "typeorm";
import { Notification } from "../entities/Notification";
import { QueryParamsModel } from "../models/queryParamsModel";
class NotificationService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const { limit, page } = query;

    const data: Notification[] = await Notification.findManyQuery({
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
      where: { title: Like(`%${query.search || ""}%`)},
    });
    const total = await Notification.count();
    return {
      data,
      total,
    };
  }
}

export const notificationService = new NotificationService();
