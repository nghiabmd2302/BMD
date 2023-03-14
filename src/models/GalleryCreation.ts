import { Property, Required } from "@tsed/common";
import { Schema } from "@tsed/schema";
import { Gallery } from "../entities/Gallery";
import { Column } from "typeorm";
export class GalleryInsert {
  @Property()
  thumbnail: string;

  async toGallery() {
    const gallery = new Gallery();
    gallery.thumbnail = this.thumbnail;
    return gallery;
  }
}
