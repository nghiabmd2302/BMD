import { Property } from "@tsed/common";
import { Teacher } from "../entities/Teacher";

export class TeacherInsert {
  @Property()
  name: string

  @Property()
  avatar: string

  @Property()
  address: string

  @Property()
  email: string

  toTeacher() {
    const teacher = new Teacher()
    teacher.name = this.name
    teacher.avatar = this.avatar
    teacher.address = this.address
    teacher.email = this.email
    return teacher
  }
}

export class TeacherUpdate {
  @Property()
  avatar: string

  @Property()
  expoToken: string

  @Property()
  email: string

  @Property()
  isDeleted: boolean

  @Property()
  username: string

  @Property()
  province: string

  @Property()
  address: string

  @Property()
  name: string

  @Property()
  forgotCode: string

  @Property()
  updatePasswordAt: number

  @Property()
  slugName: string

  @Property()
  firstPassword: string

  @Property()
  isChangedDefaultPassword: boolean

  @Property()
  messagePending: number

  toTeacher() {
    const teacher = new Teacher()
    teacher.avatar = this.avatar
    teacher.expoToken = this.expoToken
    teacher.email = this.email
    teacher.isDeleted = this.isDeleted
    teacher.username= this.username
    teacher.province = this.province
    teacher.address = this.address
    teacher.name = this.name
    teacher.forgotCode = this.forgotCode
    teacher.slugName = this.slugName
    return teacher
  }
}