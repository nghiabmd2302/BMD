import {
    BodyParams,
    Controller,
    Get,
    Post,
    HeaderParams,
    QueryParams,
    PathParams,
    Res,
    UseAuth,
  } from "@tsed/common";
  import { VerificationJWT } from "../../middlewares/auth";
  import { QueryParamsModelSchoolSearch } from "../../models/queryParamsModel";
  import { Docs } from "@tsed/swagger";
  import { Responses } from "../../services/responseService/ResponseService";
  import { Response } from "express";
import { SchoolInsert, SchoolUpdate } from "../../models/SchoolCreation";
import { schoolService } from "../../services/SchoolService";
import { School } from "../../entities/School";
  
  @Controller("/school")
  @Docs("/docs_admin")
  export class SchoolController {
    @Get("/")
    @UseAuth(VerificationJWT)
    async get(
      @HeaderParams("token") token: string,
      @QueryParams() query: QueryParamsModelSchoolSearch,
      @Res() res: Response
    ) {
      const schoolData: School[] = await schoolService.getQuery(query);
      return Responses.sendOK(res, schoolData);
    }
  
    @Post("/")
    @UseAuth(VerificationJWT)
    async create(
      @HeaderParams("token") token: String,
      @BodyParams("school") schoolData: SchoolInsert,
      @BodyParams("divisionId") divisionId: number,
      @BodyParams("addressCityId") addressCityId: number,
      @BodyParams("addressDistrictId") addressDistrictId: number,
      @BodyParams("gradeIds", Number) gradeIds: Number[],
      @BodyParams("orderGradeIds", Number) orderGradeIds: Number[],
      @Res() res: Response
    ) {
      const data = await schoolService.create(schoolData, addressCityId, addressDistrictId, divisionId, gradeIds, orderGradeIds)
      return Responses.sendOK(res, data);
    }

    @Get("/:schoolId")
    @UseAuth(VerificationJWT)
    async getOne(
      @HeaderParams("token") token: String,
      @PathParams("schoolId") schoolId: string,
      @Res() res: Response
    ) {
      const data = await schoolService.getOne(schoolId)
      return Responses.sendOK(res, data);
    }
  
    @Post("/:schoolId/update")
    @UseAuth(VerificationJWT)
    async update(
      @HeaderParams("token") token: String,
      @BodyParams("school") schoolData: SchoolUpdate,
      @BodyParams("addressCityId") addressCityId: number,
      @BodyParams("addressDistrictId") addressDistrictId: number,
      @PathParams("schoolId") schoolId: number,
      @BodyParams("divisionId") divisionId: number,
      @BodyParams("gradeIds", Number) gradeIds: Number[],
      @BodyParams("orderGradeIds", Number) orderGradeIds: Number[],
      @Res() res: Response
    ) {
      const data = await schoolService.update(schoolData, addressCityId, addressDistrictId, schoolId, divisionId, gradeIds, orderGradeIds)
      return Responses.sendOK(res, data);
    }
  
    @Post("/:schoolId/delete")
    @UseAuth(VerificationJWT)
    async delete(
      @HeaderParams("token") token: String,
      @PathParams("schoolId") schoolId: number,
      @Res() res: Response
    ) {
      await School.updateCondition({id: schoolId}, {isDeleted: true})
      return Responses.sendOK(res, {});
    }
  
    @Post("/:schoolId/password/update")
    @UseAuth(VerificationJWT)
    async updatePassword(
      @HeaderParams("token") token: String,
      @BodyParams("password") password: string,
      @PathParams("schoolId") schoolId: number,
      @Res() res: Response
    ) {
      const data = await schoolService.updatePassword(password, schoolId)
      return Responses.sendOK(res, data);
    }
  
  }
  