import {
  Controller,
  Get,
  UseBefore,
  HeaderParams,
  QueryParams,
  Res,
  UseAuth
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Response } from "express";
import { Responses } from "../../services/responseService/ResponseService";
import { addressDistrictService } from "../../services/commonService/AddressDistrictService";

@Controller("/addressDistrict")
@Docs("/docs_customer")
export class AddressDistrictController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressDistrictData = await addressDistrictService.getQuery(query)
    return Responses.sendOK(res, addressDistrictData);
  }
}
