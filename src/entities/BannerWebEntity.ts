import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  Generated,
} from "typeorm";

@Entity("bannerweb")
export class BannerWeb extends Core{

  @Column({
    type: "boolean",
    default: true,
  })
  isShow: Boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  isDeleted: Boolean;

  @Column()
  link: string;

  @Column()
  thumbnail: string;

  @Column({default: 0})
  position: number;
}
