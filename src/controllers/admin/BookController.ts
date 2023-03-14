import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  Res,
  UseAuth
} from "@tsed/common";

import { VerificationJWT } from "../../middlewares/auth";
import { BookInsert } from "../../models/BookCreation";
import { AttributeInsert } from "../../models/AttributeCreation";
import { GalleryInsert } from "../../models/GalleryCreation";
import { QueryParamsModelBookSearch } from "../../models/queryParamsModel";
import { Book } from "../../entities/Book";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { In } from "typeorm";
import { bookService } from "../../services/BookService";

interface QueryBookIds {
  bookIds: number;
}
@Controller("/book")
@Docs("/docs_admin")
export class BookController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelBookSearch,
    @Res() res: Response
  ) {
    const bookData: Book[] = await bookService.getQuery(query)
    return Responses.sendOK(res, bookData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
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
    const data = await bookService.createBook(bookData, categoryId, gradeId, coverId, authorId, publisherId, galleries,attributes)
    return Responses.sendOK(res, data);
  }

  @Post("/:bookId/update")
  @UseAuth(VerificationJWT)
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
      return Responses.sendOK(res, {});
    }

  @Post("/:bookId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bookId") bookId: number,
    @Res() res: Response
  ) {
    await Book.updateCondition({id: bookId}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }

  @Post("/remove")
  @UseAuth(VerificationJWT)
  async removeMany(
    @HeaderParams("token") token: String,
    @BodyParams("bookIds", Number) bookIds: Number[],
    @Res() res: Response
  ) {
    await Book.updateCondition({id: In(bookIds)}, {isRemoved:  true})
    return Responses.sendOK(res, {});
  }

  @Post("/restore")
  @UseAuth(VerificationJWT)
  async restoreMany(
    @HeaderParams("token") token: String,
    @BodyParams("bookIds", Number) bookIds: Number[],
    @Res() res: Response
  ) {
    await Book.updateCondition({id: In(bookIds)}, {isRemoved:  false})
    return Responses.sendOK(res, {});
  }

  @Get("/books")
  @UseAuth(VerificationJWT)
  async getMany(
    @HeaderParams("token") token: string,
    @QueryParams("bookIds", Number) bookIds: QueryBookIds[],
    @Res() res: Response
  ) {
    const books = await Book.findManyQuery({ where: { id: In(bookIds) } })
    return Responses.sendOK(res, books)
  }

  @Get("/:bookId")
  @UseAuth(VerificationJWT)
  async getOneById(
    @HeaderParams("token") token: string,
    @PathParams("bookId") bookId: number,
    @Res() res: Response
  ) {
    const book = await Book.findQuery({where: {id: bookId}})
    return Responses.sendOK(res, book)
  }
}
