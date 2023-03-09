import { Property } from "@tsed/common";
export class DivisionInsert {
  @Property()
  address: string;

  @Property()
  province: string;

  @Property()
  name: string;

  @Property()
  email: string;
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
}
