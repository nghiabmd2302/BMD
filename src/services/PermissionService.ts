import { Like } from "typeorm";
import { Permission } from "../entities/Permission";
import { QueryParamsModelLessSearch } from "../models/queryParamsModel";
class PermissionService {
  async getQuery(query: QueryParamsModelLessSearch): Promise<any> {
    const { limit, page } = query;

    const data: Permission[] = await Permission.findManyQuery({
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Permission.count();
    return {
      data,
      total,
    };
  }
}

export const permissionService = new PermissionService();
