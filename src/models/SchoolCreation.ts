import { Property } from "@tsed/common";
import { School } from "../entities/School";
export class SchoolInsert {
  @Property()
  address: string;

  @Property()
  commission: number

  @Property()
  name: string;

  @Property()
  email: string;

  toSchool() {
    const school = new School()
    school.address = this.address;
    school.name = this.name;
    school.email = this.email;
    return school;
  }
}

export class SchoolUpdate {
  @Property()
  address: string;

  @Property()
  province: string;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  commission: number;

  @Property()
  isDeleted: boolean;

  @Property()
  username: string;

  @Property()
  updatePasswordAt: number;

  @Property()
  firstPassword: string;

  @Property()
  isChangedDefaultPassword: boolean;

  addressCity: number;

  toSchool() {
    const school = new School();
    school.name = this.name;
    school.address = this.address;
    school.email = this.email;
    school.commission = this.commission;
    return school;
  }
}
