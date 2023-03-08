import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Order } from "./OrderEntity";

@Entity("bmd_address_city")
export class AddressCity extends Core {
  @Column({ type: Boolean, default: false })
  isBlock: boolean;

  @Column()
  priority: number;

  @Column()
  code: number;

  @Column()
  nameWithType: string;

  @Column()
  type: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  feeDelivery: number;

  @OneToMany(() => Order, (order) => order.addressCity)
  orders: Order[];
}
