import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  Generated,
} from "typeorm";

@Entity("banner")
export class Banner extends Core{
  @Column({
    type: "boolean",
    default: true,
  })
  isShow: Boolean;

  @Column()
  thumbnail: string;

  @Column({default: 0})
  position: number;

  @Column({ default: 0 })
  newId: number;

  @Column({ default: 0 })
  promotionId: number;
}
