import { Like } from "typeorm";
import { Author } from "../../entities/AuthorEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
class AuthorService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const data: Author[] = await Author.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: [{ name: Like(`%${query.search || ""}%`) }],
    });
    const total = await Author.count();
    return {
      data,
      total,
    };
  }
}

export const authorService = new AuthorService();
