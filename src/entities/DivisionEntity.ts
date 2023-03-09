import { Core } from "../core/entity/Core";
import { Entity, Column, ManyToOne } from "typeorm";
import { AddressCity } from "./AddressCityEntity";
@Entity("division")
export class Division extends Core {
  @Column()
  address: string;

  @Column()
  province: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  commission: number;

  @Column()
  isDeleted: boolean;

  @Column()
  username: string;

  @Column()
  updatePasswordAt: number;

  @Column()
  firstPassword: string;

  @Column()
  isChangedDefaultPassword: boolean;

  @ManyToOne(() => AddressCity, (addressCity) => addressCity.division)
  addressCity: number;
}
