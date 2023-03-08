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
import { BannerWeb } from "../../entities/BannerWebEntity";
import { BannerWebInsert } from "../../models/BannerWebCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { bannerWebService } from "../../services/commonService/BannerWebService";

@Controller("/bannerWeb")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class BannerWebController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerWebData = await bannerWebService.getQuery(query)
    return Responses.resCount(res, bannerWebData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("bannerWeb") bannerWebData: BannerWebInsert,
    @Res() res: Response
  ) {
    await BannerWeb.save({...bannerWebData})
    return Responses.resOk(res, bannerWebData);
  }

  @Post("/:bannerWebId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("bannerWeb") bannerWebData: BannerWebInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerWebId") bannerWebId: number,
    @Res() res: Response
  ) {
    await BannerWeb.updateCondition({id: bannerWebId}, {...bannerWebData})
    return Responses.resOk(res, {});
  }

  @Post("/:bannerWebId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerWebId") bannerWebId: number,
    @Res() res: Response
  ) {
    await BannerWeb.delete({id: bannerWebId})
    return Responses.resOk(res, {});
  }
}
