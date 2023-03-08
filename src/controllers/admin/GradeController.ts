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
import { GradeInsert } from "../../models/GradeCreation";
import { Grade } from "../../entities/GradeEntity";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express"
import { gradeService } from "../../services/adminService/GradeService";

@Controller("/grade")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class GradeController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const gradeData: Grade[] = await gradeService.getQuery(query)
    return Responses.resCount(res, gradeData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("grade") gradeData: GradeInsert,
    @Res() res: Response
  ) {
    const data = await Grade.save(gradeData)
    return Responses.resOk(res, data);
  }

  @Post("/:gradeId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("grade") gradeData: GradeInsert,
    @HeaderParams("token") token: String,
    @PathParams("gradeId") gradeId: number,
    @Res() res: Response
  ) {
    await Grade.updateCondition({id: gradeId}, gradeData)
    return Responses.resOk(res, {});
  }

  @Post("/:gradeId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("gradeId") gradeId: number,
    @Res() res: Response
  ) {
    await Grade.updateCondition({id: gradeId}, {idDeleted: true})
    return Responses.resOk(res, {});
  }
}
