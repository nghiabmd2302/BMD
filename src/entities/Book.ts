import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Default, Property } from "@tsed/common";
import { Attribute } from "./Attribute";
import { Category } from "./Category";
import { Cover } from "./Cover";
import { Author } from "./Author";
import { Grade } from "./Grade";
import { Publisher } from "./Publisher";
import { Gallery } from "./Gallery";
import { Core } from "../core/entity/Core";
import { OrderDetail } from "./OrderDetail";

export enum TypeEnum {
  SINGLE = "SINGLE",
  COMBO = "COMBO",
}

@Entity("book")
export class Book extends Core{
  @Column({
    type: "enum",
    enum: TypeEnum,
    default: TypeEnum.SINGLE,
  })
  type: TypeEnum.SINGLE;

  @Column()
  thumbnail: string;

  @Column()
  @Default(false)
  isOutOfStock: boolean;

  @Column()
  @Default(false)
  isDeleted: boolean;

  @Column()
  page: number;

  @Column()
  size: string;

  @Column()
  publishDate: string;

  @Column()
  finalPrice: number;

  @Column()
  originPrice: number;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  isHighlight: boolean;

  @Column()
  authorName: string;

  @Column()
  @Default(false)
  isRemoved: boolean;

  @Column()
  code: string;

  @Column()
  kvId: number;

  @Column()
  attribute1: string;

  @Column()
  attribute2: string;

  @ManyToOne(() => Category, (cate) => cate.book)
  category: Category;

  @ManyToOne(() => Grade, (grade) => grade.book)
  grade: Grade;

  @ManyToOne(() => Author, (author) => author.book)
  author: Author;

  @ManyToOne(() => Cover, (cover) => cover.book)
  cover: Cover;

  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  publisher: Publisher;

  @OneToMany(() => Attribute, (attributes) => attributes.book)
  attributes: Attribute[];

  @OneToMany(() => Gallery, (gallery) => gallery.book)
  galleries: Gallery[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.book)
  orderDetails: OrderDetail[];

  async assignCategory(categoryId: number) {
    this.category = await Category.findOneAndThrow({ where: { id: categoryId } }, categoryId);
  }

  async assignGrade(gradeId: number) {
    this.grade = await Grade.findOneAndThrow({ where: { id: gradeId } }, gradeId);
  }

  async assignAuthor(authorId: number) {
    this.author = await Author.findOneAndThrow({ where: { id: authorId } }, authorId);
  }

  async assignCover(coverId: number) {
    this.cover = await Cover.findOneAndThrow({ where: { id: coverId } }, coverId);
  }

  async assignPublisher(publisherId: number) {
    this.publisher = await Publisher.findOneAndThrow({ where: { id: publisherId } }, publisherId);
  }
}

