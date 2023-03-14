import { Like } from "typeorm";
import { Media } from "../entities/Media";
import { QueryParamsModel } from "../models/queryParamsModel";
import { Error } from "./errorService/ErrorService";
import { Responses } from "./responseService/ResponseService";
import {Response} from "express"

class MediaService {
  async getQuery(query: QueryParamsModel): Promise<any> {
    const data: Media[] = await Media.findManyQuery({
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
      where: [{ name: Like(`%${query.search || ""}%`) }],
    });
    const total = await Media.count();
    return {
      data,
      total,
    };
  }

  async upload(res: Response, file: Express.Multer.File): Promise<any>{
    //@ts-ignore
    const image = file;
    if (!image) {
      return Error.badRequest("Không có ảnh được cung cấp!", {});
    }

    const mediaFound = await Media.findOneBy({name: image.originalname})
    if(mediaFound) {
      return Error.badRequest("Ảnh đã tồn tại!", {});
    }

    return Responses.sendOK(res, {
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

export const mediaService = new MediaService();
