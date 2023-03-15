import { hashPassword } from "../utils/password.utils";
import { Staff } from "../entities/Staff";
import { StaffInsert } from "../models/StaffCreation";

class StaffService {
  async create(staffData: StaffInsert, roleId: number) {
    const staff: Staff = staffData.toStaff()
    await staff.assignRole(roleId)
    const newPassword =await hashPassword(staff.password)
    staff.password = newPassword
    const data =await Staff.save(staff)
    return data
  }
}

export const staffService = new StaffService();
