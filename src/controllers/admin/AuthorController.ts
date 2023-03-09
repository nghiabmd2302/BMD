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
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { AuthorInsert } from "../../models/AuthorCreation";
import { Author } from "../../entities/AuthorEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import {Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { authorService } from "../../services/commonService/AuthorService";

@Controller("/author")
@Docs("/docs_admin")
export class AuthorController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const authorData = await authorService.getQuery(query)
    return Responses.sendOK(res, authorData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("author") authorData: AuthorInsert,
    @Res() res: Response
  ) {
    await Author.save({...authorData})
    return Responses.sendOK(res, authorData);
  }

  @Post("/:authorId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("author") authorData: AuthorInsert,
    @HeaderParams("token") token: String,
    @PathParams("authorId") authorId: number,
    @Res() res: Response
  ) {
    await Author.updateCondition({id: authorId}, {...authorData})
    return Responses.sendOK(res, {});

  }

  @Post("/:authorId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("authorId") authorId: number,
    @Res() res: Response
  ) {
    await Author.updateCondition({id: authorId}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }
}
