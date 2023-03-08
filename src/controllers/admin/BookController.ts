import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  Res
} from "@tsed/common";

import { CustomAuthMiddleware } from "../../middlewares/auth";
import { BookInsert } from "../../models/BookCreation";
import { AttributeInsert } from "../../models/AttributeCreation";
import { GalleryInsert } from "../../models/GalleryCreation";
import { QueryParamsModel, QueryParamsModelBookSearch } from "../../models/queryParamsModel";
import { Book } from "../../entities/BookEntity";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { In } from "typeorm";
import { bookService } from "../../services/adminService/BookService";

interface QueryBookIds {
  bookIds: number;
}
@Controller("/book")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class BookController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelBookSearch,
    @Res() res: Response
  ) {
    const bookData: Book[] = await bookService.getQuery(query)
    return Responses.resCount(res, bookData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("book") bookData: BookInsert,
    @BodyParams("categoryId") categoryId: number,
    @BodyParams("gradeId") gradeId: number,
    @BodyParams("coverId") coverId: number,
    @BodyParams("authorId") authorId: number,
    @BodyParams("publisherId") publisherId: number,
    @BodyParams("gallery", GalleryInsert) galleries: GalleryInsert[],
    @BodyParams("attributes", AttributeInsert) attributes: AttributeInsert[],
    @Res() res: Response
  ) {
    const bookDataSave = await Book.save({...bookData, category: categoryId, grade: gradeId, cover: coverId, author: authorId, publisher: publisherId, galleries, attributes})
    return Responses.resOk(res, bookDataSave)
  }

  @Post("/:bookId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("book") bookData: BookInsert,
    @BodyParams("categoryId") categoryId: number,
    @BodyParams("gradeId") gradeId: number,
    @BodyParams("coverId") coverId: number,
    @BodyParams("authorId") authorId: number,
    @BodyParams("publisherId") publisherId: number,
    @BodyParams("gallery", GalleryInsert) galleries: GalleryInsert[],
    @BodyParams("attributes", AttributeInsert) attributes: AttributeInsert[],
    @PathParams("bookId") bookId: number,
    @Res() res: Response
  ) {
      await Book.updateCondition({id: bookId}, {...bookData, category: categoryId, grade: gradeId, cover: coverId, author: authorId, publisher: publisherId, galleries, attributes})
      return Responses.resOk(res, {});
    }

  @Post("/:bookId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bookId") bookId: number,
    @Res() res: Response
  ) {
    await Book.updateCondition({id: bookId}, {isDeleted: true})
    return Responses.resOk(res, {});
  }

  @Post("/remove")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async removeMany(
    @HeaderParams("token") token: String,
    @BodyParams("bookIds", Number) bookIds: Number[],
    @Res() res: Response
  ) {
    await Book.updateCondition({id: In(bookIds)}, {isRemoved:  true})
    return Responses.resOk(res, {});
  }

  @Post("/restore")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async restoreMany(
    @HeaderParams("token") token: String,
    @BodyParams("bookIds", Number) bookIds: Number[],
    @Res() res: Response
  ) {
    await Book.updateCondition({id: In(bookIds)}, {isRemoved:  false})
    return Responses.resOk(res, {});
  }

  @Get("/books")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async getMany(
    @HeaderParams("token") token: string,
    @QueryParams("bookIds", Number) bookIds: QueryBookIds[],
    @Res() res: Response
  ) {
    const books = await Book.findManyQuery({ where: { id: In(bookIds) } })
    return Responses.resOk(res, books)
  }

  @Get("/:bookId")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async getOneById(
    @HeaderParams("token") token: string,
    @PathParams("bookId") bookId: number,
    @Res() res: Response
  ) {
    const book = await Book.findQuery({where: {id: bookId}})
    return Responses.resOk(res, book)
  }
}
