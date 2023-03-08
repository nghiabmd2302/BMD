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
import { AuthorInsert } from "../../models/AuthorCreation";
import { Author } from "../../entities/AuthorEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Like } from "typeorm";
import {Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { authorService } from "../../services/commonService/AuthorService";

@Controller("/author")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class AuthorController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const authorData = await authorService.getQuery(query)
    return Responses.resCount(res, authorData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("author") authorData: AuthorInsert,
    @Res() res: Response
  ) {
    await Author.save({...authorData})
    return Responses.resOk(res, authorData);
  }

  @Post("/:authorId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("author") authorData: AuthorInsert,
    @HeaderParams("token") token: String,
    @PathParams("authorId") authorId: number,
    @Res() res: Response
  ) {
    await Author.updateCondition({id: authorId}, {...authorData})
    return Responses.resOk(res, {});

  }

  @Post("/:authorId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("authorId") authorId: number,
    @Res() res: Response
  ) {
    await Author.updateCondition({id: authorId}, {isDeleted: true})
    return Responses.resOk(res, {});
  }
}
