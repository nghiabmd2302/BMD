import {
  Controller,
  Get,
  UseBefore,
  HeaderParams,
  QueryParams,
  Res
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressCityService } from "../../services/commonService/AddressCityService";

@Controller("/addressCity")
@Docs("/docs_customer")
@UseAuth(CustomAuthMiddleware, { role: "customer" })
export class AddressCityController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const addressCityData = await addressCityService.getQuery(query)
    return Responses.resCount(res, addressCityData);
  }
}
