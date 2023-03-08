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
import { BannerTeacher } from "../../entities/BannerTeacherEntity";
import { BannerTeacherInsert } from "../../models/BannerTeacherCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { bannerTeacherService } from "../../services/commonService/BannerTeacherService";

@Controller("/bannerTeacher")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class BannerTeacherController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerTeacherData = await bannerTeacherService.getQuery(query)
    return Responses.resCount(res, bannerTeacherData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("bannerTeacher") bannerTeacherData: BannerTeacherInsert,
    @Res() res: Response
  ) {
    await BannerTeacher.save({...bannerTeacherData})
    return Responses.resOk(res, bannerTeacherData);
  }

  @Post("/:bannerTeacherId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("bannerTeacher") bannerTeacherData: BannerTeacherInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerTeacherId") bannerTeacherId: number,
    @Res() res: Response
  ) {
    await BannerTeacher.updateCondition({id: bannerTeacherId}, {...bannerTeacherData})
    return Responses.resOk(res, {});
  }

  @Post("/:bannerTeacherId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerTeacherId") bannerTeacherId: number,
    @Res() res: Response
  ) {
    await BannerTeacher.delete({id: bannerTeacherId})
    return Responses.resOk(res, {});
  }
}
