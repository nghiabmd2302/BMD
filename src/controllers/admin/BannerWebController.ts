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
import { BannerWeb } from "../../entities/BannerWebEntity";
import { BannerWebInsert } from "../../models/BannerWebCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Response} from "express"
import { Responses } from "../../services/responseService/ResponseService";
import { bannerWebService } from "../../services/commonService/BannerWebService";

@Controller("/bannerWeb")
@Docs("/docs_admin")
export class BannerWebController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerWebData = await bannerWebService.getQuery(query)
    return Responses.sendOK(res, bannerWebData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("bannerWeb") bannerWebData: BannerWebInsert,
    @Res() res: Response
  ) {
    await BannerWeb.save({...bannerWebData})
    return Responses.sendOK(res, bannerWebData);
  }

  @Post("/:bannerWebId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("bannerWeb") bannerWebData: BannerWebInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerWebId") bannerWebId: number,
    @Res() res: Response
  ) {
    await BannerWeb.updateCondition({id: bannerWebId}, {...bannerWebData})
    return Responses.sendOK(res, {});
  }

  @Post("/:bannerWebId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerWebId") bannerWebId: number,
    @Res() res: Response
  ) {
    await BannerWeb.delete({id: bannerWebId})
    return Responses.sendOK(res, {});
  }
}
