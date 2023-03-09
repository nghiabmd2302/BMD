const multer = require("multer");
import * as fs from "fs"
import { Error } from "../services/errorService/ErrorService";
const path = require("path");
import "reflect-metadata";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseUrl = req.baseUrl
    const segments = baseUrl.split("/");
    const pathName = segments[segments.length - 1];
    const pathFinal = `./media/${pathName}`

    fs.mkdirSync(pathFinal, { recursive: true })

    cb(null, pathFinal);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    // cb(null, file.originalname);
    cb(null, uniqueSuffix);
  },
});

export const fileFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(Error.badRequest("Chỉ cung cấp với ảnh dạng jpeg/png"));
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
