import {Property} from "@tsed/common"
import { Staff } from "../entities/Staff"
export class StaffInsert{
    @Property()
    username: string

    @Property()
    name: string

    @Property()
    avatar: string

    @Property()
    phone: string

    @Property()
    email: string

    @Property()
    isBlock: boolean

    @Property()
    description: string

    @Property()
    password: string

    @Property()
    isSupperAdmin: boolean

    @Property()
    updatePasswordAt: number

    toStaff() {
        const staff = new Staff()
        staff.username = this.username
        staff.name = this.name
        staff.avatar = this.avatar
        staff.phone = this.phone
        staff.email = this.email
        staff.isBlock = this.isBlock
        staff.description = this.description
        staff.isSupperAdmin = this.isSupperAdmin
        staff.updatePasswordAt = this.updatePasswordAt
        staff.password = this.password
        return staff
    }
}