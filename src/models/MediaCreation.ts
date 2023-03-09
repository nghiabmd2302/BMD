import { Property } from "@tsed/common";
import { Entity } from "typeorm";

@Entity("media")
export class MediaInsert {
  @Property()
  name: string;

  @Property()
  thumbnail: string;

  @Property()
  isDeleted: boolean;
}
