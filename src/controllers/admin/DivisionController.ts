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
import { VerificationJWT } from "../../middlewares/auth";
import { QueryParamsModelDivisionSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { DivisionInsert, DivisionUpdate } from "../../models/DivisionCreation";
import { Division } from "../../entities/Division";
import { divisionService } from "../../services/DivisionService";

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
    const data = await divisionService.create(divisionData, addressCity)
    return Responses.sendOK(res, data);
  }

  @Post("/:divisionId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("division") divisionData: DivisionUpdate,
    @BodyParams("addressCityId") addressCityId: number,
    @PathParams("divisionId") divisionId: number,
    @Res() res: Response
  ) {
    const data = await divisionService.update(divisionData, addressCityId, divisionId)
    return Responses.sendOK(res, data);
  }

  @Post("/:divisionId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("divisionId") divisionId: number,
    @Res() res: Response
  ) {
    await Division.updateCondition({id: divisionId}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }

  @Post("/:divisionId/password/update")
  @UseAuth(VerificationJWT)
  async updatePassword(
    @HeaderParams("token") token: String,
    @BodyParams("password") password: string,
    @PathParams("divisionId") divisionId: number,
    @Res() res: Response
  ) {
    const data = await divisionService.updatePassword(password, divisionId)
    return Responses.sendOK(res, data);
  }

}
