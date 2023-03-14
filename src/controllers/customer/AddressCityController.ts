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
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressCityService } from "../../services/AddressCityService";

@Controller("/addressCity")
@Docs("/docs_customer")
export class AddressCityController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const addressCityData = await addressCityService.getQuery(query)
    return Responses.sendOK(res, addressCityData);
  }
}
