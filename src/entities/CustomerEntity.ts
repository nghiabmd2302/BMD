import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { Order } from "./OrderEntity";

enum Role {
  CUSTOMER = "customer",
}

@Entity("customer")
export class Customer extends Core{
  @Column({ type: String, default: Role.CUSTOMER })
  code: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  dob: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  expoToken: string;

  @Column()
  fcmToken: string;

  @Column()
  slugName: string;

  @Column()
  messagePending: number;

  @Column()
  expireContactBook: number;

  @Column()
  avatar: string;

  @Column()
  forgotCode: string;

  @Column()
  totalNotifyContact: number;

  @Column()
  totalNotifyNormal: number;

  @Column()
  parentName: string;

  @Column()
  parentPhone: string;

  @Column()
  isChangedDefaultPassword: boolean;

  @Column()
  updatePasswordAt: number;

  @Column()
  firstPassword: string;

  @Column()
  facebookId: string;

  @Column()
  zaloId: string;

  @Column()
  googleId: string;

  @Column()
  appleId: string;

  @Column()
  school: number;

  @Column()
  classroom: number;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
