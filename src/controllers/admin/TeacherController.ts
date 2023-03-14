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
  UseAuth,
} from "@tsed/common";
import { VerificationJWT } from "../../middlewares/auth";
import { QueryParamsModelTeacherSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { Division } from "../../entities/Division";
import { divisionService } from "../../services/DivisionService";
import { SchoolInsert, SchoolUpdate } from "../../models/SchoolCreation";
import { schoolService } from "../../services/SchoolService";
import { School } from "../../entities/School";
import { TeacherInsert, TeacherUpdate } from "../../models/TeacherCreation";
import { teacherService } from "../../services/TeacherService";
import { Teacher } from "../../entities/Teacher";

@Controller("/teacher")
@Docs("/docs_admin")
export class TeacherController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelTeacherSearch,
    @Res() res: Response
  ) {
    const teacherData: Teacher[] = await teacherService.getQuery(query);
    return Responses.sendOK(res, teacherData);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("teacher") teacherData: TeacherInsert,
    @BodyParams("schoolId") schoolId: number,
    @BodyParams("classroomId") classroomId: number,
    @Res() res: Response
  ) {
    const data = await teacherService.create(teacherData, schoolId, classroomId);
    return Responses.sendOK(res, data);
  }

  @Get("/:teacherId")
  @UseAuth(VerificationJWT)
  async getOne(
    @HeaderParams("token") token: String,
    @PathParams("teacherId") teacherId: string,
    @Res() res: Response
  ) {
    const data = await teacherService.getOne(teacherId);
    return Responses.sendOK(res, data);
  }

  @Post("/:teacherId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("teacher") teacherData: TeacherUpdate,
    @BodyParams("schoolId") schoolId: number,
    @BodyParams("classroomId") classroomId: number,
    @PathParams("teacherId") teacherId: number,
    @Res() res: Response
  ) {
    const data = await teacherService.update(teacherData, schoolId, classroomId, teacherId);
    return Responses.sendOK(res, data);
  }

  @Post("/:teacherId/password/update")
  @UseAuth(VerificationJWT)
  async updatePassword(
    @HeaderParams("token") token: String,
    @BodyParams("password") password: string,
    @PathParams("teacherId") teacherId: number,
    @Res() res: Response
  ) {
    const data = await teacherService.updatePassword(password, teacherId);
    return Responses.sendOK(res, data);
  }

  @Post("/:teacherId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("teacherId") teacherId: number,
    @Res() res: Response
  ) {
    await Teacher.updateCondition({ id: teacherId }, { isDeleted: true });
    return Responses.sendOK(res, {});
  }

  @Post("/clear")
  @UseAuth(VerificationJWT)
  async clear(
    @HeaderParams("token") token: String,
    @Res() res: Response
  ) {
    await Teacher.updateCondition({}, {isDeleted: true})
    return Responses.sendOK(res, {});
  }
}
