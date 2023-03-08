import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Format } from "@tsed/common";
import { Core } from "../core/entity/Core";

enum role {
  ADMIN = "admin",
}

@Entity("staff")
export default class Staff extends Core{

  @Column({ type: String, default: role.ADMIN })
  code: string;

  @Column()
  dob: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  description: string;

  @Column()
  avatar: string;

  @Column()
  isBlock: boolean;

  @Column({ type: Boolean, default: false })
  isDeleted: boolean;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;
}
