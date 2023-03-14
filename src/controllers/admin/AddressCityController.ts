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
import { VerificationJWT } from "../../middlewares/auth";
import { AddressCity } from "../../entities/AddressCity";
import { AddressCityInsert } from "../../models/AddressCityCreation";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { addressCityService } from "../../services/AddressCityService";

@Controller("/addressCity")
@Docs("/docs_admin")
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

  @Post("/:addressCityId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("addressCity") addressCityData: AddressCityInsert,
    @HeaderParams("token") token: String,
    @PathParams("addressCityId") addressCityId: number,
    @Res() res: Response
  ) {
    await AddressCity.updateCondition(
      { id: addressCityId },
      { ...addressCityData }
    );
    return Responses.sendOK(res, {});
  }
}
