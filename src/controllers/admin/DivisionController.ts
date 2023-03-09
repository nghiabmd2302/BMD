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
  UseAuth,
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { GradeInsert } from "../../models/GradeCreation";
import { Grade } from "../../entities/GradeEntity";
import { QueryParamsModelDivisionSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { gradeService } from "../../services/adminService/GradeService";
import { DivisionInsert } from "../../models/DivisionCreation";
import { Division } from "../../entities/DivisionEntity";
import { divisionService } from "../../services/adminService/DivisionService";

@Controller("/division")
@Docs("/docs_admin")
export class DivisionController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelDivisionSearch,
    @Res() res: Response
  ) {
    const divisionData: Division[] = await divisionService.getQuery(query);
    return Responses.sendOK(res, divisionData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("division") divisionData: DivisionInsert,
    @BodyParams("addressCityId") addressCity: number,
    @Res() res: Response
  ) {
    const data = await Division.save({ ...divisionData, addressCity });
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("division") divisionData: DivisionInsert,
    @BodyParams("addressCityId") addressCity: number,
    @Res() res: Response
  ) {
    const data = await Division.save({ ...divisionData, addressCity });
    return Responses.sendOK(res, data);
  }

  // @Post("/:gradeId/update")
  // @UseAuth(VerificationJWT)
  // async update(
  //   @BodyParams("grade") gradeData: GradeInsert,
  //   @HeaderParams("token") token: String,
  //   @PathParams("gradeId") gradeId: number,
  //   @Res() res: Response
  // ) {
  //   await Grade.updateCondition({id: gradeId}, gradeData)
  //   return Responses.resOk(res, {});
  // }

  // @Post("/:gradeId/delete")
  // @UseAuth(VerificationJWT)
  // async delete(
  //   @HeaderParams("token") token: String,
  //   @PathParams("gradeId") gradeId: number,
  //   @Res() res: Response
  // ) {
  //   await Grade.updateCondition({id: gradeId}, {idDeleted: true})
  //   return Responses.resOk(res, {});
  // }
}
