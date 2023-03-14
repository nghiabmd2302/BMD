import { Core } from "../core/entity/Core";
import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { AddressCity } from "./AddressCity";
import { AddressDistrict } from "./AddressDistrict";
import { Grade } from "./Grade";
import { Division } from "./Division";
import { Classroom } from "./Classroom";
import { Teacher } from "./Teacher";
import { Customer } from "./Customer";

@Entity("school")
export class School extends Core {
  @Column()
  address: string;

  @Column()
  commission: number;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  expiredAt: number;

  @Column()
  updatePasswordAt: number;

  @Column()
  firstPassword: string;

  @Column()
  isChangedDefaultPassword: boolean;

  @ManyToOne(() => AddressCity, (addressCity) => addressCity.school)
  addressCity: AddressCity;

  @ManyToOne(() => AddressDistrict, (addressDistrict) => addressDistrict.school)
  addressDistrict: AddressDistrict;

  @ManyToOne(() => Division, (division) => division.school)
  division: Division;

  @OneToMany(() => Grade, (grade) =>grade.school)
  grades: Grade[];

  @OneToMany(() => Grade, (grade) =>grade.orderSchool)
  orderGrades: Grade[];

  @OneToMany(() => Classroom, (classroom) =>classroom.school)
  classroom: Classroom[];

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teacher: Teacher[]

  @OneToMany(() => Customer, (customer) => customer.school)
  customer: Customer[]

  async assignAddressCity(addressCityId: number) {
    this.addressCity = await AddressCity.findOneAndThrow({ where: { id: addressCityId } }, addressCityId);
  }
  async assignAddressDistrict(addressDistrictId: number) {
    this.addressDistrict = await AddressDistrict.findOneAndThrow({ where: { id: addressDistrictId } }, addressDistrictId);
  }

  async assignDivision(divisionId: number) {
    this.division = await Division.findOneAndThrow({ where: { id: divisionId } }, divisionId);
  }

}
