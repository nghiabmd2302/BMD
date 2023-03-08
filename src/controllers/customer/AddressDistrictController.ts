import {
  Controller,
  Get,
  UseBefore,
  HeaderParams,
  QueryParams,
  Res,
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Response } from "express";
import { Responses } from "../../services/responseService/ResponseService";
import { addressDistrictService } from "../../services/commonService/AddressDistrictService";

@Controller("/addressDistrict")
@Docs("/docs_customer")
@UseAuth(CustomAuthMiddleware, { role: "customer" })
export class AddressDistrictController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "customer" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressDistrictData = await addressDistrictService.getQuery(query)
    return Responses.resOk(res, addressDistrictData);
  }
}
