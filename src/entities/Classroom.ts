import { Core } from "../core/entity/Core";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Grade } from "./Grade";
import { School } from "./School";
import { Teacher } from "./Teacher";
import { Customer } from "./Customer";

@Entity("classroom")
export class Classroom extends Core {
  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => Grade, (grade) => grade.classroom)
  grade: Grade;

  @ManyToOne(() => Teacher, (teacher) => teacher.classroom)
  teacher: Teacher

  @ManyToOne(() => School, (school) => school.classroom)
  school: School;

  @OneToMany(() => Customer, (customer) => customer.classroom)
  customer: Customer[]

  async assignGrade(gradeId: number) {
    this.grade = await Grade.findOneAndThrow({ where: { id: gradeId } }, gradeId);
  }

  async assignTeacher(teacherId: number) {
    this.teacher = await Teacher.findOneAndThrow({ where: { id: teacherId } }, teacherId);
  }

  async assignSchool(schoolId: number) {
    this.school = await School.findOneAndThrow({ where: { id: schoolId } }, schoolId);
  }
}
