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
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { PublisherInsert } from "../../models/PublisherCreation";
import { Publisher } from "../../entities/PublisherEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Like } from "typeorm";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { publisherService } from "../../services/adminService/PublisherService";

@Controller("/publisher")
@Docs("/docs_admin")
export class PublisherController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const publisherData: Publisher[] = await publisherService.getQuery(query)
    return Responses.sendOK(res, publisherData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("publisher") publisherData: PublisherInsert,
    @Res() res: Response
  ) {
    const data = await Publisher.save(publisherData)
    return Responses.sendOK(res, data);
  }

  @Post("/:publisherId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("publisher") publisherData: PublisherInsert,
    @HeaderParams("token") token: String,
    @PathParams("publisherId") publisherId: number,
    @Res() res: Response
  ) {
    await Publisher.updateCondition({id: publisherId}, publisherData)
    return Responses.sendOK(res, {});
  }

  @Post("/:publisherId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("publisherId") publisherId: number,
    @Res() res: Response
  ) {
    await Publisher.updateCondition({id: publisherId}, {isDeleted: true})
    return Responses.sendOK(res, {}); 
  }
}
