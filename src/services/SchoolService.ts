import { DivisionInsert, DivisionUpdate } from "../models/DivisionCreation";
import { In, Like } from "typeorm";
import { Division } from "../entities/Division";
import { QueryParamsModelSchoolSearch } from "../models/queryParamsModel";
import { hashPassword } from "../utils/password.utils";
import * as moment from "moment";
import { SchoolInsert, SchoolUpdate } from "../models/SchoolCreation";
import { Grade } from "../entities/Grade";
import { School } from "../entities/School";
class SchoolService {
  async getOne(schoolId: string) {
    const options = {
      relations: ["grades", "orderGrades", "addressCity", "addressDistrict", "division"],
      where: {
        id: schoolId
      }
    }
    const data = await School.findQuery(options)
    return data
  }
  async getQuery(query: QueryParamsModelSchoolSearch): Promise<any> {
    const {limit, page, addressCityId, search = "", addressDistrictId, divisionId} = query
    let condition = {};
    if (addressCityId !== undefined || addressCityId !== null) {
      condition = {
        ...condition,
        addressCity: {
          id: addressCityId
        },
      };
    }

    if (addressDistrictId !== undefined || addressDistrictId !== null) {
      condition = {
        ...condition,
        addressDistrict: {
          id: addressDistrictId
        },
      };
    }

    if (divisionId !== undefined || divisionId !== null) {
      condition = {
        ...condition,
        division: {
          id: divisionId
        },
      };
    }
    const data: School[] = await School.findManyQuery({
      relations: ["addressCity", "division", "addressDistrict", "grades", "orderGrades"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await School.count();
    return {
      data,
      total,
    };
  }

  async create(schoolData: SchoolInsert, addressCityId: number, addressDistrictId: number, divisionId: number, gradeIds: Number[], orderGradeIds: Number[]) {
    const school = schoolData.toSchool()
    const username = "T" + Math.floor(new Date().valueOf() * Math.random())
    school.username = username
    school.firstPassword = (Math.floor(Math.random() * 900000) + 100000).toString()
    school.password = await hashPassword((Math.floor(Math.random() * 900000) + 100000).toString())
    school.isChangedDefaultPassword = false
    await school.assignDivision(divisionId)
    await school.assignAddressCity(addressCityId)
    await school.assignAddressDistrict(addressDistrictId)
    const grades = await Grade.findManyQuery({where: {id: In(gradeIds)}})
    const orderGrades = await Grade.findManyQuery({where: {id: In(orderGradeIds)}})
    school.grades = grades
    school.orderGrades = orderGrades

    const data = await School.save(school)
    return data
  }

  async update(schoolData: SchoolUpdate, addressCityId: number, addressDistrictId: number, schoolId: number, divisionId: number, gradeIds: Number[], orderGradeIds: Number[]) {
    const schoolFound = await School.findOneAndThrow({where: {id: schoolId}})
    const school = schoolData.toSchool()
    await school.assignAddressCity(addressCityId)
    await school.assignAddressDistrict(addressDistrictId)
    await school.assignDivision(divisionId)
    const grades = await Grade.findManyQuery({where: {id: In(gradeIds)}})
    const orderGrades = await Grade.findManyQuery({where: {id: In(orderGradeIds)}})
    school.grades = grades
    school.orderGrades = orderGrades

    const data = await School.save({...schoolFound, ...school})
    return data
  }

  async updatePassword(password: string, schoolId: number) {
    const schoolFound: School = await School.findOneAndThrow({where: {id: schoolId}})
    const school = new School()
    const newPassword = await hashPassword(password)
    school.isChangedDefaultPassword = true
    school.password = newPassword
    school.updatePasswordAt = moment().unix()
    const data = await School.save({...schoolFound, ...school})
    return data
  }
}

export const schoolService = new SchoolService();
