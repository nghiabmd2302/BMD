import { Like } from "typeorm";
import { Book } from "../../entities/BookEntity";
import { QueryParamsModelBookSearch } from "../../models/queryParamsModel";
class BookService {
  async getQuery(query: QueryParamsModelBookSearch): Promise<any> {
    const data: Book[] = await Book.findManyQuery({
      where: {
        name: Like(`%${query.search || ""}%`),
        grade: query.gradeId || 0,
        category: query.categoryId || 0,
        cover: query.coverId || 0,
        publisher: query.publisherId || 0,
        author: query.authorId || 0,
        isHighlight: query.isHighlight || false,
        isOutOfStock: query.isOutOfStock || false,
      },
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
    });
    const total = await Book.count();
    return {
      data,
      total,
    };
  }
}

export const bookService = new BookService();
