import { Core } from "../core/entity/Core";
import {
    Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { Grade } from "./Grade";
import { School } from "./School";
import { Classroom } from "./Classroom";

@Entity("teacher")
export class Teacher extends Core{
    @Column()
    avatar: string

    @Column()
    expoToken: string

    @Column()
    email: string

    @Column()
    isDeleted: boolean

    @Column()
    username: string

    @Column()
    province: string

    @Column()
    address: string

    @Column()
    name: string

    @Column()
    forgotCode: string

    @Column()
    slugName: string

    @Column()
    updatePasswordAt: number

    @Column()
    firstPassword: string

    @Column()
    isChangedDefaultPassword: boolean

    @Column()
    messagePending: number

    @Column()
    password: string

    @ManyToOne(() => School, (school) => school.teacher)
    school: School

    @ManyToOne(() => Classroom, (classroom) => classroom.teacher)
    classroom: Classroom

    async assignSchool(schoolId: number) {
      this.school = await School.findOneAndThrow({ where: { id: schoolId } }, schoolId);
    }

    async assignClassroom(classroomId: number) {
      this.classroom = await Classroom.findOneAndThrow({ where: { id: classroomId } }, classroomId);
    }
}
