import {
  BodyParams,
  Controller,
  Post,
  Req,
  Res,
  Next,
  Get,
  UseBefore,
  HeaderParams,
  Use,
  EndpointMetadata,
} from "@tsed/common";
import { Docs } from "@tsed/swagger";
import { CoreEntity } from "../../entities/TestEntity";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import * as Joi from "joi";
import { MulterOptions, MultipartFile } from "@tsed/multipartfiles";

import { NextFunction } from "express";
const multer = require("multer");
import { Middleware } from "@tsed/common";
import { Error } from "../../services/errorService/ErrorService";
const path = require("path")
import 'reflect-metadata';
import { RequestHandler } from 'express';
import {Validator} from '../../middlewares/validate'

const CONTROLLER_METADATA_KEY = 'controllerName';

export function Controllers(controllerName: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, controllerName, target);
  };
}



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./media");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    // cb(null, file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(Error.badRequest("Chỉ cung cấp với ảnh dạng jpeg/png"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

@Controller("/test")
@Docs("/docs_customer")
export class TestController {
  @Post("/")
  @UseBefore(Validator({name: Joi.string().min(3), test: Joi.string().max(3)}))
  async create(
    @BodyParams("name") name: string,
    @BodyParams("test") test: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // Do something with the validated data...
  }

  @Get("/")
  async find(@HeaderParams("id") id: number, @Res() res: Response) {
    const data = await CoreEntity.findQuery({ where: { id } });
    return Responses.sendOK(res, data);
  }

  @Post("/upload")
  @UseBefore(upload.single("file"))
  public uploadFile(
    @MultipartFile("file") file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    //@ts-ignore
    const image = req.file;

    if(!image) {
      return Error.badRequest("Không có ảnh được cung cấp!", {})
    }

    Responses.sendOK(res, {fieldname: image.fieldname,
      originalname: image.originalname,
      encoding: image.encoding,
      mimetype: image.mimetype,
      filename: image.filename,
      path: image.path,
      destination: image.destination,
      size: image.size})
   
  }
}
