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
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressWardService } from "../../services/AddressWardService";

@Controller("/addressDistrict")
@Docs("/docs_customer")
export class AddressWardController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressWardData = await addressWardService.getQuery(query)
    return Responses.sendOK(res, addressWardData);
  }
}
