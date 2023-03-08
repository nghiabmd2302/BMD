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
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { AddressCity } from "../../entities/AddressCityEntity";
import { AddressCityInsert } from "../../models/AddressCityCreation";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { addressCityService } from "../../services/commonService/AddressCityService";

@Controller("/addressCity")
@Docs("/docs_admin")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
export class AddressCityController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const addressCityData = await addressCityService.getQuery(query)
    return Responses.resOk(res, addressCityData);
  }

  @Post("/:addressCityId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
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
    return Responses.resOk(res, {});
  }
}
