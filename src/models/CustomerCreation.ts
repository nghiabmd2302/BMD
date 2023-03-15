import { Property } from "@tsed/common";
import { Customer } from "../entities/Customer";

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

  toCustomer() {
    const customer = new Customer()
    customer.username = this.username
    customer.dob =this.dob
    customer.password = this.password
    customer.phone = this.phone
    customer.name = this.name
    customer.email = this.email
    customer.address = this.address
    customer.gender = this.gender
    return customer
  }
}
export class CustomerUpdate {

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