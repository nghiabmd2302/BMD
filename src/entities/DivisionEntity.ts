import { Core } from "../core/entity/Core";
import { Entity, Column } from "typeorm";
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
}
