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
import { AddressDistrict } from "../../entities/AddressDistrictEntity";
import { AddressDistrictInsert } from "../../models/AddressDistrictCreation";
import {QueryParamsModel, QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { addressDistrictService } from "../../services/commonService/AddressDistrictService";

@Controller("/addressDistrict")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class AddressDistrictController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query:QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressDistrictData = await addressDistrictService.getQuery(query)
    return Responses.resOk(res, addressDistrictData);
  }

  @Post("/:addressDistrictId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("addressDistrict") addressDistrictData: AddressDistrictInsert,
    @HeaderParams("token") token: String,
    @PathParams("addressDistrictId") addressDistrictId: number,
    @Res() res: Response
  ) {
    await AddressDistrict.updateCondition(
      { id: addressDistrictId },
      { ...addressDistrictData }
    );
    return Responses.resOk(res, {});
  }
}
