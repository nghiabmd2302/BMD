import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  Res
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { AddressWard } from "../../entities/AddressWardEntity";
import { AddressWardInsert } from "../../models/AddressWardCreation";
import { QueryParamsModelParentCode } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import {Response} from "express"
import { addressWardService } from "../../services/commonService/AddressWardService";

@Controller("/addressWard")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class AddressWardController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelParentCode,
    @Res() res: Response
  ) {
    const addressWardData = await addressWardService.getQuery(query)
    return Responses.resOk(res, addressWardData);
  }

  @Post("/:addressWardId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
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
    return Responses.resOk(res, {});
  }
}
