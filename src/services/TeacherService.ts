import { In, Like } from "typeorm";
import { QueryParamsModelTeacherSearch } from "../models/queryParamsModel";
import { hashPassword } from "../utils/password.utils";
import * as moment from "moment";
import { SchoolUpdate } from "../models/SchoolCreation";
import { Grade } from "../entities/Grade";
import { School } from "../entities/School";
import { TeacherInsert, TeacherUpdate } from "../models/TeacherCreation";
import { Teacher } from "../entities/Teacher";
class TeacherService {
  async getOne(teacherId: string) {
    const options = {
      relations: ["school", "classroom"],
      where: {
        id: teacherId,
      },
    };
    const data = await Teacher.findQuery(options);
    return data;
  }
  async getQuery(query: QueryParamsModelTeacherSearch): Promise<any> {
    const { limit, page, search = "", classroomId, schoolId } = query;
    let condition = {};
    if (classroomId !== undefined || classroomId !== null) {
      condition = {
        ...condition,
        classroom: {
          id: classroomId,
        },
      };
    }

    if (schoolId !== undefined || schoolId !== null) {
      condition = {
        ...condition,
        school: {
          id: schoolId,
        },
      };
    }
    const data: Teacher[] = await Teacher.findManyQuery({
      relations: ["school", "classroom"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
      skip: limit * (page - 1) || 0,
      take: Number(limit) || 10,
    });
    const total = await Teacher.count();
    return {
      data,
      total,
    };
  }

  async create(
    teacherData: TeacherInsert,
    schoolId: number,
    classroomId: number
  ) {
    const teacher = teacherData.toTeacher();

    const username = "T" + Math.floor(new Date().valueOf() * Math.random());
    teacher.username = username;
    teacher.firstPassword = (
      Math.floor(Math.random() * 900000) + 100000
    ).toString();
    teacher.password = await hashPassword(
      (Math.floor(Math.random() * 900000) + 100000).toString()
    );
    teacher.isChangedDefaultPassword = false;
    await teacher.assignClassroom(classroomId);
    await teacher.assignSchool(schoolId);
    const data = await Teacher.save(teacher);
    return data;
  }

  async update(
    teacherData: TeacherUpdate,
    schoolId: number,
    classroomId: number,
    teacherId: number
  ) {
    const teacherFound = await Teacher.findOneAndThrow({
      where: { id: teacherId},
    });
    const teacher = teacherData.toTeacher();
    await teacher.assignClassroom(classroomId)
    await teacher.assignSchool(schoolId)

    const data = await Teacher.save({ ...teacherFound, ...teacher });
    return data;
  }

  async updatePassword(password: string, teacherId: number) {
    const teacherFound: Teacher = await Teacher.findOneAndThrow({
      where: { id: teacherId },
    });
    const teacher = new Teacher();
    const newPassword = await hashPassword(password);
    teacher.isChangedDefaultPassword = true;
    teacher.password = newPassword;
    teacher.updatePasswordAt = moment().unix();
    const data = await Teacher.save({ ...teacherFound, ...teacher });
    return data;
  }
}

export const teacherService = new TeacherService();
