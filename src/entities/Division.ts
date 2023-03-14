import { Core } from "../core/entity/Core";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { AddressCity } from "./AddressCity";
import { School } from "./School";
@Entity("division")
export class Division extends Core {
  @Column()
  address: string;

  @Column()
  province: string;
  
  @Column()
  password: string;

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
  addressCity: AddressCity;

  @OneToMany(() => School, (school) => school.division)
  school: School[];

  async assignAddressCity (addressCityId: number) {
    this.addressCity = await AddressCity.findOneAndThrow({where: {id: addressCityId}}, addressCityId)
}
}
