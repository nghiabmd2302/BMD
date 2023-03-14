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
import { VerificationJWT } from "../../middlewares/auth";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { MediaInsert } from "../../models/MediaCreation";
import { Media } from "../../entities/Media";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { mediaService } from "../../services/MediaService";
import { MultipartFile } from "@tsed/multipartfiles";
import { Error } from "../../services/errorService/ErrorService";
import { In } from "typeorm";

@Controller("/media")
@Docs("/docs_admin")
export class MediaController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModel,
    @Res() res: Response
  ) {
    const mediaData: Media[] = await mediaService.getQuery(query)
    return Responses.sendOK(res, mediaData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("media") mediaData: MediaInsert,
    @Res() res: Response
  ) {
    const data = await Media.save(mediaData);
    return Responses.sendOK(res, data);
  }

  @Post("/:mediaId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("media") mediaData: MediaInsert,
    @PathParams("mediaId") mediaId: number,
    @Res() res: Response
  ) {
    await Media.updateCondition({id: mediaId}, mediaData)
    return Responses.sendOK(res, {});
  }

  @Post("/:mediaId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("mediaId") mediaId: number,
    @Res() res: Response
  ) {
    await Media.updateCondition({id: mediaId}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }


  @Post("/delete")
  @UseAuth(VerificationJWT)
  async deleteIds(
    @HeaderParams("token") token: String,
    @BodyParams("mediaIds", Number) mediaIds: Number[],
    @Res() res: Response
  ) {
    await Media.updateCondition({id: In(mediaIds)}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }
  

  @Post("/upload")
  @UseAuth(VerificationJWT)
  async upload(
    @HeaderParams("token") token: string,
    @MultipartFile("file") file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await mediaService.upload(res, file)
  }
}
