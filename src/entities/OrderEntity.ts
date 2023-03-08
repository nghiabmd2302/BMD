import { Core } from "../core/entity/Core";
import {
  Entity,
  OneToMany,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { AddressCity } from "./AddressCityEntity";
import { AddressDistrict } from "./AddressDistrictEntity";
import { AddressWard } from "./AddressWardEntity";
import { Customer } from "./CustomerEntity";
import { OrderDetail } from "./OrderDetailEntity";

enum paymentStatus {
  PENDING = "PENDING",
  FAIL = "FAIL",
  COMPLETE = "COMPLETE",
  REFUND = "REFUND",
}

@Entity("order")
export class Order extends Core {
  @Column()
  note: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  paymentStatus: string;

  @Column()
  paymentType: string;

  @Column()
  status: string;

  @Column()
  code: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  moneyDistance: number;

  @Column()
  moneyTotal: number;

  @Column()
  moneyDiscount: number;

  @Column()
  moneyFinal: number;

  @Column()
  expoToken: string;

  @Column()
  kvCode: number;

  @Column()
  kvId: number;

  @Column()
  promotionCode: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: number;

  @ManyToOne(() => AddressCity, (addressCity) => addressCity.orders)
  addressCity: number;

  @ManyToOne(() => AddressDistrict, (addressDistrict) => addressDistrict.orders)
  addressDistrict: number;

  @ManyToOne(() => AddressWard, (addressWard) => addressWard.orders)
  addressWard: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  details: OrderDetail[];
}
