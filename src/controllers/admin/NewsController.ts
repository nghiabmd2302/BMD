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
  Req,
  UseAuth
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { Docs } from "@tsed/swagger";
import { News } from "../../entities/News";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { NewsInsert } from "../../models/NewsCreation";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { newsService } from "../../services/NewsService";
import { In } from "typeorm";
import { MultipartFile } from "@tsed/multipartfiles";
import { Error } from "../../services/errorService/ErrorService";
import { upload } from "../../utils/upload";

@Controller("/news")
@Docs("/docs_admin")
export class NewsController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const data = await newsService.getQuery(query);
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @BodyParams("news", NewsInsert) news: NewsInsert,
    @HeaderParams("token") token: string,
    @Res() res: Response
  ) {
    const data = await News.save(news);
    return Responses.sendOK(res, data);
  }

  @Get("/recycle")
  @UseAuth(VerificationJWT)
  async recycle(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const data = await newsService.getQuery(query, true);
    return Responses.sendOK(res, data);
  }

  @Post("/delete")
  @UseAuth(VerificationJWT)
  async deleteNews(
    @HeaderParams("token") token: string,
    @BodyParams("newsIds", Number) newsIds: Number[],
    @Res() res: Response
  ) {
    await News.updateCondition({id: In(newsIds)}, {isDeleted: true})
    return Responses.sendOK(res, {})
  }

  @Post("/remove")
  @UseAuth(VerificationJWT)
  async removeNews(
    @HeaderParams("token") token: string,
    @BodyParams("newsIds", Number) newsIds: Number[],
    @Res() res: Response
  ) {
    await News.updateCondition({id: In(newsIds)}, {isRemove: true})
    return Responses.sendOK(res, {})
  }

  @Post("/restore")
  @UseAuth(VerificationJWT)
  async restore(
    @HeaderParams("token") token: string,
    @BodyParams("newsIds", Number) newsIds: Number[],
    @Res() res: Response
  ) {
    await News.updateCondition({id: In(newsIds)}, {isRemove: false})
    return Responses.sendOK(res, {})
  }


  @Post("/:newsId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("news", NewsInsert) news: NewsInsert,
    @HeaderParams("token") token: string,
    @PathParams("newsId") newsId: number,
    @Res() res: Response
  ) {
    await News.updateCondition({id: newsId}, news)
    return Responses.sendOK(res, {})
  }

  @Post("/:newsId/update")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: string,
    @PathParams("newsId") newsId: number,
    @Res() res: Response
  ) {
    await News.updateCondition({id: newsId}, {isDeleted: true})
    return Responses.sendOK(res, {})
  }

  // @Post("/upload")
  // @UseAuth(VerificationJWT, upload.single("file"))
  // async upload(
  //   @HeaderParams("token") token: string,
  //   @MultipartFile("file") file: Express.Multer.File,
  //   @Req() req: Request,
  //   @Res() res: Response
  // ) {
  //   // @ts-ignore
  //   const image = req.file;

  //   if (!image) {
  //     return Error.badRequest("Không có ảnh được cung cấp!", {});
  //   }

  //   Responses.resOk(res, {
  //     fieldname: image.fieldname,
  //     originalname: image.originalname,
  //     encoding: image.encoding,
  //     mimetype: image.mimetype,
  //     filename: image.filename,
  //     path: image.path,
  //     destination: image.destination,
  //     size: image.size,
  //   });
  // }


}
