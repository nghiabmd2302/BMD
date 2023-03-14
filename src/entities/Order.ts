import { Core } from "../core/entity/Core";
import {
  Entity,
  OneToMany,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { AddressCity } from "./AddressCity";
import { AddressDistrict } from "./AddressDistrict";
import { AddressWard } from "./AddressWard";
import { Customer } from "./Customer";
import { OrderDetail } from "./OrderDetail";

enum PaymentStatus {
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

  @Column({default:PaymentStatus.PENDING, type: "enum" ,enum: PaymentStatus})
  // @Enum
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
  customer: Customer;

  @ManyToOne(() => AddressCity, (addressCity) => addressCity.orders)
  addressCity: AddressCity;

  @ManyToOne(() => AddressDistrict, (addressDistrict) => addressDistrict.orders)
  addressDistrict: AddressDistrict;

  @ManyToOne(() => AddressWard, (addressWard) => addressWard.orders)
  addressWard: AddressWard;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  details: OrderDetail[];

  async assignCustomer(customerId: number) {
    this.customer = await Customer.findOneAndThrow({ where: { id: customerId } }, customerId);
  }
  async assignAddressCity(addressCityId: number) {
    this.addressCity = await AddressCity.findOneAndThrow({ where: { id: addressCityId } }, addressCityId);
  }
  async assignAddressDistrict(addressDistrictId: number) {
    this.addressDistrict = await AddressDistrict.findOneAndThrow({ where: { id: addressDistrictId } }, addressDistrictId);
  }
  async assignAddressWard(addressWardId: number) {
    this.addressWard = await AddressWard.findOneAndThrow({ where: { id: addressWardId } }, addressWardId);
  }
}
