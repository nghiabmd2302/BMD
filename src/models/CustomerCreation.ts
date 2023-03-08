import { Property } from "@tsed/common";

export class CustomerInsert {
  @Property()
  username: string;

  @Property()
  password: string;

  @Property()
  dob: string;

  @Property()
  phone: string;

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  address: string;

  @Property()
  gender: string;
}
export class CustomerUpdate extends CustomerInsert {
  @Property()
  expoToken: string;

  @Property()
  fcmToken: string;

  @Property()
  slugName: string;

  @Property()
  messagePending: number;

  @Property()
  expireContactBook: number;

  @Property()
  avatar: string;

  @Property()
  username: string;

  @Property()
  forgotCode: string;

  @Property()
  totalNotifyContact: number;

  @Property()
  totalNotifyNormal: number;

  @Property()
  parentName: string;

  @Property()
  parentPhone: string;

  @Property()
  isChangedDefaultPassword: boolean;

  @Property()
  updatePasswordAt: number;

  @Property()
  firstPassword: string;

  @Property()
  facebookId: string;

  @Property()
  zaloId: string;

  @Property()
  googleId: string;

  @Property()
  appleId: string;

  @Property()
  school: number;

  @Property()
  classroom: number;

  @Property()
  isDeleted: boolean;
}

export class CustomerPassword {
  @Property()
  oldPassword: string;

  @Property()
  newPassword: string;
}

export class CustomerLogin {
  @Property()
  username: string

  @Property()
  password: string
}