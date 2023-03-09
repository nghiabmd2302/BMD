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
import { Cover } from "../../entities/CoverEntity";
import { CoverInsert } from "../../models/CoverCreation";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { coverService } from "../../services/adminService/CoverService";

@Controller("/cover")
@Docs("/docs_admin")
export class CoverController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response

  ) {
    const covers: Cover[] = await coverService.getQuery(query)
    return Responses.sendOK(res, covers);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("cover") coverData: CoverInsert,
    @Res() res: Response
  ) {
    const data = await Cover.save(coverData)
    return Responses.sendOK(res, data)
  }

  @Post("/:coverId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("cover") coverData: CoverInsert,
    @HeaderParams("token") token: String,
    @PathParams("coverId") coverId: number,
    @Res() res: Response
  ) {
    await Cover.updateCondition({id: coverId}, {...coverData})
    return Responses.sendOK(res, {})
  }

  @Post("/:coverId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("coverId") coverId: number,
    @Res() res: Response
  ) {
    await Cover.updateCondition({id: coverId}, {isDeleted: true})
    return Responses.sendOK(res, {})
  }
}
