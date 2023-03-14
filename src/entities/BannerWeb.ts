import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  Generated,
} from "typeorm";

@Entity("bannerweb")
export class BannerWeb extends Core{

  @Column()
  isShow: Boolean;

  @Column()
  isDeleted: Boolean;

  @Column()
  link: string;

  @Column()
  thumbnail: string;

  @Column()
  position: number;
}
