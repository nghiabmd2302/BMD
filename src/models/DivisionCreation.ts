import { Property } from "@tsed/common";
import { Division } from "../entities/Division";
export class DivisionInsert {
  @Property()
  address: string;

  @Property()
  province: string;

  @Property()
  name: string;

  @Property()
  email: string;

  addressCity: number;

  toDivision() {
    const division = new Division();
    division.address = this.address;
    division.province = this.province;
    division.name = this.name;
    division.email = this.email;
    return division;
  }
}

export class DivisionUpdate {
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

  toDivision() {
    const division = new Division();
    division.address = this.address;
    division.province = this.province;
    division.name = this.name;
    division.email = this.email;
    return division;
  }
}
