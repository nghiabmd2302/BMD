import { Property, Required } from "@tsed/common";
import { Schema } from "@tsed/schema";
import { Column } from "typeorm";
export class GalleryInsert {
  @Property()
  thumbnail: string;
}
