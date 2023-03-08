import {
  BodyParams,
  Controller,
  Get,
  HeaderParams,
  Post,
  Req,
  Res,
  UseBefore,
} from "@tsed/common";
import { generateToken } from "../../utils/jwt";
import Staff from "../../entities/StaffEntity";
import { StaffInsert } from "../../models/StaffCreation";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { comparePassword } from "../../utils/password.utils";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { check } from "express-validator";
import { validateMiddleware } from "../../middlewares/validate";
import { Responses } from "../../services/responseService/ResponseService";
import { Response, Request } from "express";
import { StaffPassword, StaffUpdate } from "../../models/StaffUpdate";
import { Error } from "../../services/errorService/ErrorService";
import { hashPassword } from "../../utils/password.utils";

export interface StaffInfo {
  username: string;
  password: string;
  id: string | number;
  code: string;
}

@Controller("/auth")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class AuthController {
  @Post("/login")
  @UseBefore(
    ...[
      check("username")
        .not()
        .isEmpty()
        .withMessage("Tên đăng nhập không được bỏ trống"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Mật khẩu không được bỏ trống"),
    ],
    validateMiddleware
  )
  async login(
    @BodyParams() data: StaffInsert,
    @Req() req: Req,
    @Res() res: Res
  ) {
    const staff: Staff = await Staff.findQuery({
      select: ["username", "password", "code", "id"],
      where: { username: data.username },
    });

    await comparePassword(data.password, staff.password);

    generateToken(staff, res);
  }

  @Get("/profile")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async profile(
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    // @ts-ignore
    const staffId = request.user.id;
    const staffData = await Staff.findQuery({ where: { id: staffId } });
    return Responses.resOk(res, staffData);
  }

  @Post("/profile")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("staff") staff: StaffUpdate,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response
  ) {
    const staffId = request.user.id;
    await Staff.updateCondition({ id: staffId }, { ...staff });
    return Responses.resOk(res, {});
  }

  @Post("/profile/password/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async passwordUpdate(
    @BodyParams() staffPassword: StaffPassword,
    @HeaderParams("token") token: string,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    if (staffPassword.oldPassword === staffPassword.newPassword) {
      return Error.badRequest("Mật khẩu mới không được trùng mật khẩu cũ!")
    }

    const staffId = request.user.id;

    const staffFound: Staff = await Staff.findQuery({
      select: ["username", "password", "code", "id"],
      where: { id: staffId },
    });

    await comparePassword(staffPassword.oldPassword, staffFound.password)

    let password = await hashPassword(staffPassword.newPassword);
    await Staff.updateCondition({id: staffId}, {password})
    return Responses.resOk(res, {});

  }
}
