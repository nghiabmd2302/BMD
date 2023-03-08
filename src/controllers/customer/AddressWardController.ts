import {
  Controller,
  Get,
  UseBefore,
  HeaderParams,
  QueryParams,
  Res
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressWardService } from "../../services/commonService/AddressWardService";

@Controller("/addressDistrict")
@Docs("/docs_customer")
@UseAuth(CustomAuthMiddleware, { role: "customer" })
export class AddressWardController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressWardData = await addressWardService.getQuery(query)
    return Responses.resOk(res, addressWardData);
  }
}
