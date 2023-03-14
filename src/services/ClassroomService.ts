import { DivisionInsert, DivisionUpdate } from "../models/DivisionCreation";
import { In, Like } from "typeorm";
import { Division } from "../entities/Division";
import { QueryParamsModelClassroomSearch } from "../models/queryParamsModel";
import { hashPassword } from "../utils/password.utils";
import * as moment from "moment";
import { SchoolInsert, SchoolUpdate } from "../models/SchoolCreation";
import { Grade } from "../entities/Grade";
import { School } from "../entities/School";
import { ClassroomInsert } from "../models/ClassroomCreation";
import { Classroom } from "../entities/Classroom";
import { Customer } from "../entities/Customer";
class ClassroomService {
  async getOne(schoolId: string) {
    const options = {
      relations: [
        "grades",
        "orderGrades",
        "addressCity",
        "addressDistrict",
        "division",
      ],
      where: {
        id: schoolId,
      },
    };
    const data = await School.findQuery(options);
    return data;
  }
  async getQuery(query: QueryParamsModelClassroomSearch): Promise<any> {
    const { limit, page, search = "", schoolId, gradeId } = query;
    let condition = {};
    if (schoolId !== undefined || schoolId !== null) {
      condition = {
        ...condition,
        school: {
          id: schoolId,
        },
      };
    }

    if (gradeId !== undefined || gradeId !== null) {
      condition = {
        ...condition,
        grade: {
          id: gradeId,
        },
      };
    }

    const data: Classroom[] = await Classroom.findManyQuery({
      relations: ["grade", "school", "teacher"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Classroom.count();
    return {
      data,
      total,
    };
  }

  async create(
    classroomData: ClassroomInsert,
    schoolId: number,
    teacherId: number,
    gradeId: number
  ) {
    const classroom = classroomData.toClassroom();
    await classroom.assignGrade(gradeId);
    // await classroom.assignTeacher(teacherId)
    await classroom.assignSchool(schoolId);

    const data = await Classroom.save(classroom);
    return data;
  }

  async update(
    classroomData: ClassroomInsert,
    schoolId: number,
    teacherId: number,
    gradeId: number,
    classroomId: number
  ) {
    const classroomFound = await Classroom.findOneAndThrow({
      where: { id: classroomId },
    });
    const classroom = classroomData.toClassroom();
    await classroom.assignGrade(gradeId);
    // await classroom.assignTeacher(teacherId)
    await classroom.assignSchool(schoolId);
    const data = await Classroom.save({ ...classroomFound, ...classroom });
    return data;
  }

  async transfer(classroomId: number, customerIds: Number[]) {
    const customers: Customer[] = await Customer.find({
      where: { id: In(customerIds) },
    });

    customers.map(async (item) => {
      await item.assignClassroom(classroomId);
      const data = await Customer.save({ ...item });
    });

    return {};
  }
}

export const classroomService = new ClassroomService();
