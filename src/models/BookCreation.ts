import { Default, Property, MinLength } from "@tsed/common";
import { Book } from "../entities/Book";

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

  toBook() {
    const book = new Book();
    book.thumbnail = this.thumbnail;
    book.isOutOfStock = this.isOutOfStock;
    book.isDeleted = this.isDeleted;
    book.page = this.page;
    book.size = this.size;
    book.publishDate = this.publishDate;
    book.finalPrice = this.finalPrice;
    book.originPrice = this.originPrice;
    book.description = this.description;
    book.name = this.name;
    book.isHighlight = this.isHighlight;
    book.authorName = this.authorName;
    book.isRemoved = this.isRemoved;
    book.code = this.code;
    book.kvId = this.kvId;
    book.attribute1 = this.attribute1;
    book.attribute2 = this.attribute2;
    return book;
  }
}
