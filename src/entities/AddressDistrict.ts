import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Order } from "./Order";
import { School } from "./School";

@Entity("bmd_address_district")
export class AddressDistrict extends Core{

  @Column({ type: Boolean, default: false })
  isBlock: boolean;

  @Column()
  parentCode: number;

  @Column()
  pathWithType: string;

  @Column()
  path: string;

  @Column()
  nameWithType: string;

  @Column()
  priority: number;

  @Column()
  code: number;

  @Column()
  type: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  feeDelivery: number;

  @OneToMany(() => Order, (order) => order.addressDistrict)
  orders: Order[];

  @OneToMany(() => School, (school) => school.addressDistrict)
  school: School[];
}
