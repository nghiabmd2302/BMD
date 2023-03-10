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
import { GradeInsert } from "../../models/GradeCreation";
import { Grade } from "../../entities/Grade";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express"
import { gradeService } from "../../services/GradeService";

@Controller("/grade")
@Docs("/docs_admin")
export class GradeController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const gradeData: Grade[] = await gradeService.getQuery(query)
    return Responses.sendOK(res, gradeData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("grade") gradeData: GradeInsert,
    @Res() res: Response
  ) {
    const data = await Grade.save(gradeData)
    return Responses.sendOK(res, data);
  }

  @Post("/:gradeId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("grade") gradeData: GradeInsert,
    @HeaderParams("token") token: String,
    @PathParams("gradeId") gradeId: number,
    @Res() res: Response
  ) {
    await Grade.updateCondition({id: gradeId}, gradeData)
    return Responses.sendOK(res, {});
  }

  @Post("/:gradeId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("gradeId") gradeId: number,
    @Res() res: Response
  ) {
    await Grade.updateCondition({id: gradeId}, {idDeleted: true})
    return Responses.sendOK(res, {});
  }
}
