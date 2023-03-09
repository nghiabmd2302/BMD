import { Property } from "@tsed/common";

export class NewsInsert {
  @Property()
  isDeleted: boolean;

  @Property()
  title: string;

  @Property()
  thumbnail: string;

  @Property()
  body: string;

  @Property()
  image: string;

  @Property()
  isHighlight: boolean;

  @Property()
  isRemove: boolean;
}
