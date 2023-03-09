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
import { Banner } from "../../entities/BannerEntity";
import { BannerInsert } from "../../models/BannerCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { bannerService } from "../../services/commonService/BannerService";
import { MultipartFile } from "@tsed/multipartfiles";
import { Error } from "../../services/errorService/ErrorService";
import { upload } from "../../utils/upload";

@Controller("/banner")
@Docs("/docs_admin")
export class BannerController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerData = await bannerService.getQuery(query);
    return Responses.sendOK(res, bannerData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("banner") bannerData: BannerInsert,
    @Res() res: Response
  ) {
    await Banner.save({ ...bannerData });
    return Responses.sendOK(res, bannerData);
  }

  @Post("/:bannerId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("banner") bannerData: BannerInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerId") bannerId: number,
    @Res() res: Response
  ) {
    await Banner.updateCondition({ id: bannerId }, { ...bannerData });
    return Responses.sendOK(res, {});
  }

  @Post("/:bannerId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerId") bannerId: number,
    @Res() res: Response
  ) {
    await Banner.delete({ id: bannerId });
    return Responses.sendOK(res, {});
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
