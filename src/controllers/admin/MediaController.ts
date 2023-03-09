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
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { MediaInsert } from "../../models/MediaCreation";
import { Media } from "../../entities/MediaEntity";
import { QueryParamsModel } from "../../models/queryParamsModel";
import { mediaService } from "../../services/adminService/MediaService";
import { upload } from "../../utils/upload";
import { MultipartFile } from "@tsed/multipartfiles";
import { Error } from "../../services/errorService/ErrorService";

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

  // @Post("/:gradeId/update")
//   @UseAuth(VerificationJWT)
  // async update(
  //   @BodyParams("grade") gradeData: GradeInsert,
  //   @HeaderParams("token") token: String,
  //   @PathParams("gradeId") gradeId: number,
  //   @Res() res: Response
  // ) {
  //   await Grade.updateCondition({id: gradeId}, gradeData)
  //   return Responses.resOk(res, {});
  // }

  // @Post("/:gradeId/delete")
//   @UseAuth(VerificationJWT)
  // async delete(
  //   @HeaderParams("token") token: String,
  //   @PathParams("gradeId") gradeId: number,
  //   @Res() res: Response
  // ) {
  //   await Grade.updateCondition({id: gradeId}, {idDeleted: true})
  //   return Responses.resOk(res, {});
  // }

  @Post("/upload")
  @UseAuth(VerificationJWT)
  async upload(
    @HeaderParams("token") token: string,
    @MultipartFile("file") file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {

    //@ts-ignore
    const image = file;

    if (!image) {
      return Error.badRequest("Không có ảnh được cung cấp!", {});
    }

    Responses.sendOK(res, {
      fieldname: image.fieldname,
      originalname: image.originalname,
      encoding: image.encoding,
      mimetype: image.mimetype,
      filename: image.filename,
      path: image.path,
      destination: image.destination,
      size: image.size,
    });
  }
}
