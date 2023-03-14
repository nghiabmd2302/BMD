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
import { QueryParamsModelClassroomSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { SchoolUpdate } from "../../models/SchoolCreation";
import { schoolService } from "../../services/SchoolService";
import { School } from "../../entities/School";
import { ClassroomInsert } from "../../models/ClassroomCreation";
import { classroomService } from "../../services/ClassroomService";
import { Classroom } from "../../entities/Classroom";
import { Configuration } from "../../entities/Configuration";
import { configurationService } from "../../services/ConfigurationService";
import { ConfigurationInsert } from "../../models/ConfigurationCreation";

@Controller("/configuration")
@Docs("/docs_admin")
export class ConfigurationController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelClassroomSearch,
    @Res() res: Response
  ) {
    const data: Classroom[] = await classroomService.getQuery(query);
    return Responses.sendOK(res, data);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("configuration") configurationData: ConfigurationInsert,
    @Res() res: Response
  ) {
    const data = await configurationService.create(configurationData)
    return Responses.sendOK(res, data);
  }

  @Post("/:classroomId/update")
  @UseAuth(VerificationJWT)
  async update(
    @HeaderParams("token") token: String,
    @BodyParams("classroom") classroomData: ClassroomInsert,
    @PathParams("classroomId") classroomId: number,
    @BodyParams("schoolId") schoolId: number,
    @BodyParams("teacherId") teacherId: number,
    @BodyParams("gradeId") gradeId: number,
    @Res() res: Response
  ) {
    const data = await classroomService.update(
      classroomData,
      schoolId,
      teacherId,
      gradeId,
      classroomId
    );
    return Responses.sendOK(res, data);
  }

  @Post("/:classroomId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("classroomId") classroomId: number,
    @Res() res: Response
  ) {
    await Classroom.updateCondition({ id: classroomId }, { isDeleted: true });
    return Responses.sendOK(res, {});
  }
}
