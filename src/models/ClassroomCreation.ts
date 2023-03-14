import { Property } from "@tsed/common";
import { Classroom } from "../entities/Classroom";

export class ClassroomInsert {
  @Property()
  isDeleted: boolean;

  @Property()
  name: string;

  @Property()
  code: string;

  toClassroom() {
    const classroom = new Classroom();
    classroom.isDeleted = this.isDeleted;
    classroom.name = this.name;
    classroom.code = this.code;
    return classroom
  }
}
