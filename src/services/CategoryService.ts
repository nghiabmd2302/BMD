import { Like } from "typeorm";
import { Category } from "../entities/Category";
import { QueryParamsModelMoreSearch } from "../models/queryParamsModel";
class CategoryService {
  async getQuery(query: QueryParamsModelMoreSearch): Promise<any> {
    const {search, limit, page, parentId, level} = query
    let condition = {};
    if (parentId !== undefined || parentId !== null) {
      condition = {
        ...condition, parent1: parentId,
      };
    }
    if (level !== undefined || level !== null) {
      condition = { ...condition, level: level };
    }
    const data: Category[] = await Category.findManyQuery({
        where: {
            name: Like(`%${search || ""}%`),
            ...condition
        },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Category.count();
    return {
      data,
      total,
    };
  }
}

export const categoryService = new CategoryService();
