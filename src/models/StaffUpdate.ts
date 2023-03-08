import {Required, Property} from "@tsed/common";
import {Column} from "typeorm";

export class StaffUpdate {
  @Property()
  description: string;

  @Property()
  name: string;

  @Property()
  avatar: string;

  @Property()
  phone: string;

  @Property()
  isBlock: boolean;


}

export class StaffPassword {
    @Property()
    oldPassword: string

    @Property()
    newPassword: string
}