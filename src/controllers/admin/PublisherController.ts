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
import { PublisherInsert } from "../../models/PublisherCreation";
import { Publisher } from "../../entities/PublisherEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Like } from "typeorm";
import { Responses } from "../../services/responseService/ResponseService";
import { Response} from "express"
import { publisherService } from "../../services/adminService/PublisherService";

@Controller("/publisher")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class PublisherController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const publisherData: Publisher[] = await publisherService.getQuery(query)
    return Responses.resCount(res, publisherData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("publisher") publisherData: PublisherInsert,
    @Res() res: Response
  ) {
    const data = await Publisher.save(publisherData)
    return Responses.resOk(res, data);
  }

  @Post("/:publisherId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("publisher") publisherData: PublisherInsert,
    @HeaderParams("token") token: String,
    @PathParams("publisherId") publisherId: number,
    @Res() res: Response
  ) {
    await Publisher.updateCondition({id: publisherId}, publisherData)
    return Responses.resOk(res, {});
  }

  @Post("/:publisherId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("publisherId") publisherId: number,
    @Res() res: Response
  ) {
    await Publisher.updateCondition({id: publisherId}, {isDeleted: true})
    return Responses.resOk(res, {}); 
  }
}
