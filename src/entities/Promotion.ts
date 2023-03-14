import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
} from "typeorm";

@Entity("promotion")
export class Promotion extends Core {
  @Column()
  value: number;

  @Column()
  minMoneyTotalCanApprove: number;

  @Column()
  type: string;

  @Column()
  isDeleted: boolean;

  @Column()
  endAt: number;

  @Column()
  startAt: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  image: string;

  @Column()
  description: string
}
