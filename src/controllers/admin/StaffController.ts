import {
  BodyParams,
  Controller,
  Get,
  HeaderParams,
  Post,
  Req,
  Res,
  UseBefore,
  UseAuth
} from "@tsed/common";
import { generateToken } from "../../utils/jwt";
import {Staff} from "../../entities/Staff";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { comparePassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { AuthInsert, AuthPassword, AuthUpdate } from "../../models/AuthCreation";
import { Error } from "../../services/errorService/ErrorService";
import { hashPassword } from "../../utils/password.utils";
import { Validator } from "../../middlewares/validate";
import * as Joi from "joi";
import { StaffInsert } from "../../models/StaffCreation";
import { staffService } from "../../services/StaffService";
import {Response} from "express"

export interface StaffInfo {
  username: string;
  password: string;
  id: string | number;
  code: string;
}

@Controller("/staff")
@Docs("/docs_admin")
export class StaffController {
  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: string,
    @BodyParams("staff") staffData: StaffInsert,
    @BodyParams("roleId") roleId: number,
    @Res() res: Response
  ) {
    const data = await staffService.create(staffData, roleId)
    return Responses.sendOK(res, data)
  }

}
