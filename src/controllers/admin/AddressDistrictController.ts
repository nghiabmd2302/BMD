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
import { AddressDistrict } from "../../entities/AddressDistrict";
import { AddressDistrictInsert } from "../../models/AddressDistrictCreation";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { addressDistrictService } from "../../services/AddressDistrictService";

@Controller("/addressDistrict")
@Docs("/docs_admin")
export class AddressDistrictController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query:QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressDistrictData = await addressDistrictService.getQuery(query)
    return Responses.sendOK(res, addressDistrictData);
  }

  @Post("/:addressDistrictId/update")
  @UseAuth(VerificationJWT)
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
    return Responses.sendOK(res, {});
  }
}
