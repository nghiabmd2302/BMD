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
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { Banner } from "../../entities/BannerEntity";
import { BannerInsert } from "../../models/BannerCreation";
import { QueryParamsModelLessSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { bannerService } from "../../services/commonService/BannerService";
import { MultipartFile } from "@tsed/multipartfiles";
import { Error } from "../../services/errorService/ErrorService";
import { upload } from "../../utils/upload";

@Controller("/banner")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class BannerController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelLessSearch,
    @Res() res: Response
  ) {
    const bannerData = await bannerService.getQuery(query);
    return Responses.resCount(res, bannerData);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("banner") bannerData: BannerInsert,
    @Res() res: Response
  ) {
    await Banner.save({ ...bannerData });
    return Responses.resOk(res, bannerData);
  }

  @Post("/:bannerId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("banner") bannerData: BannerInsert,
    @HeaderParams("token") token: String,
    @PathParams("bannerId") bannerId: number,
    @Res() res: Response
  ) {
    await Banner.updateCondition({ id: bannerId }, { ...bannerData });
    return Responses.resOk(res, {});
  }

  @Post("/:bannerId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("bannerId") bannerId: number,
    @Res() res: Response
  ) {
    await Banner.delete({ id: bannerId });
    return Responses.resOk(res, {});
  }

  @Post("/upload")
  @UseBefore(CustomAuthMiddleware, { role: "admin" }, upload.single("file"))
  async upload(
    @HeaderParams("token") token: string,
    @MultipartFile("file") file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // @ts-ignore
    const image = req.file;

    if (!image) {
      return Error.badRequest("Không có ảnh được cung cấp!", {});
    }

    Responses.resOk(res, {
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
