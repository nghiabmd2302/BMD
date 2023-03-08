const multer = require("multer");
import { Error } from "../services/errorService/ErrorService";
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./media");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
      // cb(null, file.originalname);
      cb(null, uniqueSuffix);
    },
  });
  
  const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(Error.badRequest("Chỉ cung cấp với ảnh dạng jpeg/png"));
    }
  };
  
export const upload = multer({ storage: storage, fileFilter: fileFilter });