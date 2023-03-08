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
import { PromotionInsert } from "../../models/PromotionCreation";
import { Promotion } from "../../entities/PromotionEntity";
import { promotionService } from "../../services/adminService/PromotionService";
  
  @Controller("/promotion")
  @UseAuth(CustomAuthMiddleware, { role: "admin" })
  @Docs("/docs_admin")
  export class PromotionController {
    @Get("/")
    @UseBefore(CustomAuthMiddleware, { role: "admin" })
    async get(
      @HeaderParams("token") token: string,
      @QueryParams() query: QueryParamsModel,
      @Res() res: Response
    ) {
      const promotionData: Publisher[] = await promotionService.getQuery(query)
      return Responses.resCount(res, promotionData);
    }
  
    @Post("/")
    @UseBefore(CustomAuthMiddleware, { role: "admin" })
    async create(
      @HeaderParams("token") token: String,
      @BodyParams("promotion") promotionData: PromotionInsert,
      @Res() res: Response
    ) {
      const data = await Promotion.save(promotionData)
      return Responses.resOk(res, data);
    }

    @Post("/:promotionId/update")
    @UseBefore(CustomAuthMiddleware, { role: "admin" })
    async update(
      @HeaderParams("token") token: String,
      @BodyParams("promotion") promotionData: PromotionInsert,
      @PathParams("promotionId") promotionId: number,
      @Res() res: Response
    ) {
      await Promotion.updateCondition({id: promotionId}, promotionData)
      return Responses.resOk(res, {});
    }

    @Post("/:promotionId/delete")
    @UseBefore(CustomAuthMiddleware, { role: "admin" })
    async delete(
      @HeaderParams("token") token: String,
      @PathParams("promotionId") promotionId: number,
      @Res() res: Response
    ) {
      await Promotion.updateCondition({id: promotionId}, {isDeleted: true})
      return Responses.resOk(res, {});
    }

    
  
  }
  