import { Default, Property, MinLength } from "@tsed/common";

export enum TypeEnum {
  SINGLE = "SINGLE",
  COMBO = "COMBO",
}

export class BookInsert {
  @Property()
  thumbnail: string;

  @Property()
  @Default(false)
  isOutOfStock: boolean;

  @Property()
  @Default(false)
  isDeleted: boolean;

  @Property()
  page: number;

  @Property()
  size: string;

  @Property()
  publishDate: string;

  @Property()
  finalPrice: number;

  @Property()
  originPrice: number;

  @Property()
  description: string;

  @Property()
  name: string;

  @Property()
  isHighlight: boolean;

  @Property()
  authorName: string;

  @Property()
  @Default(false)
  isRemoved: boolean;

  @Property()
  code: string;

  @Property()
  kvId: number;

  @Property()
  attribute1: string;

  @Property()
  attribute2: string;
}
