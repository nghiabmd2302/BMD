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
import { Cover } from "../../entities/CoverEntity";
import { CoverInsert } from "../../models/CoverCreation";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { coverService } from "../../services/adminService/CoverService";

@Controller("/cover")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class CoverController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response

  ) {
    const covers: Cover[] = await coverService.getQuery(query)
    return Responses.resCount(res, covers);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("cover") coverData: CoverInsert,
    @Res() res: Response
  ) {
    const data = await Cover.save(coverData)
    return Responses.resOk(res, data)
  }

  @Post("/:coverId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("cover") coverData: CoverInsert,
    @HeaderParams("token") token: String,
    @PathParams("coverId") coverId: number,
    @Res() res: Response
  ) {
    await Cover.updateCondition({id: coverId}, {...coverData})
    return Responses.resOk(res, {})
  }

  @Post("/:coverId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("coverId") coverId: number,
    @Res() res: Response
  ) {
    await Cover.updateCondition({id: coverId}, {isDeleted: true})
    return Responses.resOk(res, {})
  }
}
