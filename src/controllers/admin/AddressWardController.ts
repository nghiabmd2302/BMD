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
import { AddressWard } from "../../entities/AddressWardEntity";
import { AddressWardInsert } from "../../models/AddressWardCreation";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressWardService } from "../../services/commonService/AddressWardService";

@Controller("/addressWard")
@Docs("/docs_admin")
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

  @Post("/:addressWardId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("addressWard") addressWardData: AddressWardInsert,
    @HeaderParams("token") token: String,
    @PathParams("addressWardId") addressWardId: number,
    @Res() res: Response
  ) {
    await AddressWard.updateCondition(
      { id: addressWardId },
      { ...addressWardData }
    );
    return Responses.sendOK(res, {});
  }
}
