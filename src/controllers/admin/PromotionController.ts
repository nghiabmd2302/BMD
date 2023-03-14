import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  UseAuth,
  Res,
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { PublisherInsert } from "../../models/PublisherCreation";
import { Publisher } from "../../entities/Publisher";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Like } from "typeorm";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { publisherService } from "../../services/PublisherService";
import { PromotionInsert } from "../../models/PromotionCreation";
import { Promotion } from "../../entities/Promotion";
import { promotionService } from "../../services/PromotionService";

@Controller("/promotion")
@Docs("/docs_admin")
export class PromotionController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const promotionData: Publisher[] = await promotionService.getQuery(query);
    return Responses.sendOK(res, promotionData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("promotion") promotionData: PromotionInsert,
    @Res() res: Response
  ) {
    const data = await Promotion.save(promotionData);
    return Responses.sendOK(res, data);
  }

  @Post("/:promotionId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("promotion") promotionData: PromotionInsert,
    @PathParams("promotionId") promotionId: number,
    @Res() res: Response
  ) {
    await Promotion.updateCondition({ id: promotionId }, promotionData);
    return Responses.sendOK(res, {});
  }

  @Post("/:promotionId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("promotionId") promotionId: number,
    @Res() res: Response
  ) {
    await Promotion.updateCondition({ id: promotionId }, { isDeleted: true });
    return Responses.sendOK(res, {});
  }
}
