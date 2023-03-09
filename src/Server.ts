import { GlobalAcceptMimesMiddleware, PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/passport";
import "@tsed/platform-express";
import "@tsed/swagger";
import "@tsed/typeorm";
import "@tsed/ajv"; // import ajv ts.ed module
import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as session from "express-session";
import * as methodOverride from "method-override";
import errorMidlleware from "./middlewares/errorMidlleware";
const express = require("express");
import User from "./entities/StaffEntity";
import { fileFilter, storage, upload } from "./utils/upload";
const dotenv = require("dotenv");
dotenv.config();

export const rootDir = __dirname;

@Configuration({
  rootDir,
  httpPort: 3000,
  httpsPort: false,
  acceptMimes: ["application/json"],
  mount: {
    "/v1/admin": [`${rootDir}/controllers/admin/**Controller.{ts,js}`],
    "/v1/customer": [`${rootDir}/controllers/customer/**Controller.{ts,js}`],
  },
  // logger: {
  //   debug: true,
  //   logRequest: true,
  //   requestFields: [
  //     "reqId",
  //     "method",
  //     "url",
  //     "headers",
  //     "query",
  //     "params",
  //     "duration",
  //   ],
  // },
  // componentsScan: [
  //   `${rootDir}/services/*{.ts,.js}`,
  //   `${rootDir}/repositories/*{.ts,.js}`,
  //   `${rootDir}/protocols/*{.ts,.js}`
  // ],
  passport: {
    userInfoModel: User,
  },
  multer: {
    dest: process.env.DEST_STATIC,
    storage: storage,
    fileFilter: fileFilter
    // see multer options
  },
  typeorm: [
    {
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "root",
      password: "",
      database: "tesst",
      synchronize: true,
      logging: false,
      entities: [User],
    },
  ],
  ajv: {},
  swagger: [
    {
      path: "/docs_admin",
      doc: "/docs_admin",
      spec: {
        securityDefinitions: {
          "auth:basic": {
            type: "basic",
          },
        },
      },
    },
    {
      path: "/docs_customer",
      doc: "/docs_customer",
      spec: {
        securityDefinitions: {
          "auth:basic": {
            type: "basic",
          },
        },
      },
    },
  ],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(errorMidlleware)
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(express.json())
      .use("/media", express.static("media"))
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use(
        session({
          secret: "mysecretkey",
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: null,
          },
        })
      );

    return null;
  }

  $afterRoutesInit() {
    this.app.use(GlobalAcceptMimesMiddleware).use(errorMidlleware);
  }
}
