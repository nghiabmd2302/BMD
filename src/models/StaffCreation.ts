import {Required} from "@tsed/common";

export class StaffInsert{
  @Required()
  username: string;

  @Required()
  password: string;

}
