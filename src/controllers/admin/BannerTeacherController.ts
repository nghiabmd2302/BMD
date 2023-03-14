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
import { BannerTeacher } from "../../entities/BannerTeacher";
import { BannerTeacherInsert } from "../../models/BannerTeacherCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { bannerTeacherService } from "../../services/BannerTeacherService";

@Controller("/bannerTeacher")
@Docs("/docs_admin")
export class BannerTeacherController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerTeacherData = await bannerTeacherService.getQuery(query)
    return Responses.sendOK(res, bannerTeacherData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("bannerTeacher") bannerTeacherData: BannerTeacherInsert,
    @Res() res: Response
  ) {
    const bannerTeacher = await bannerTeacherData.toBannerTeacher() 
    const data = await BannerTeacher.save(bannerTeacher);
    return Responses.sendOK(res, data);
  }

  @Post("/:bannerTeacherId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("bannerTeacher") bannerTeacherData: BannerTeacherInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerTeacherId") bannerTeacherId: number,
    @Res() res: Response
  ) {
    await BannerTeacher.updateCondition({id: bannerTeacherId}, {...bannerTeacherData})
    return Responses.sendOK(res, {});
  }

  @Post("/:bannerTeacherId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerTeacherId") bannerTeacherId: number,
    @Res() res: Response
  ) {
    await BannerTeacher.delete({id: bannerTeacherId})
    return Responses.sendOK(res, {});
  }
}
