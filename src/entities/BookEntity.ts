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
import { Attribute } from "./AttributeEntity";
import { Category } from "./CategoryEntity";
import { Cover } from "./CoverEntity";
import { Author } from "./AuthorEntity";
import { Grade } from "./GradeEntity";
import { Publisher } from "./PublisherEntity";
import { Gallery } from "./GalleryEntity";
import { OrderDetail } from "./OrderDetailEntity";
import { Core } from "../core/entity/Core";

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
  @Property()
  thumbnail: string;

  @Column()
  @Default(false)
  @Property()
  isOutOfStock: boolean;

  @Column()
  @Default(false)
  @Property()
  isDeleted: boolean;

  @Column()
  @Property()
  page: number;

  @Column()
  @Property()
  size: string;

  @Column()
  @Property()
  publishDate: string;

  @Column()
  @Property()
  finalPrice: number;

  @Column()
  @Property()
  originPrice: number;

  @Column()
  @Property()
  description: string;

  @Column()
  @Property()
  name: string;

  @Column()
  @Property()
  isHighlight: boolean;

  @Column()
  @Property()
  authorName: string;

  @Column()
  @Property()
  @Default(false)
  isRemoved: boolean;

  @Column()
  @Property()
  code: string;

  @Column()
  @Property()
  kvId: number;

  @Column()
  @Property()
  attribute1: string;

  @Column()
  @Property()
  attribute2: string;

  @ManyToOne(() => Category, (cate) => cate.book)
  @Property()
  category: number;

  @ManyToOne(() => Grade, (grade) => grade.book)
  @Property()
  grade: number;

  @ManyToOne(() => Author, (author) => author.book)
  @Property()
  author: number;

  @ManyToOne(() => Cover, (cover) => cover.book)
  @Property()
  cover: number;


  @ManyToOne(() => Publisher, (publisher) => publisher.book)
  @Property()
  publisher: number;

  @OneToMany(() => Attribute, (attributes) => attributes.book, { cascade: ['insert', 'update'] })
  @Property()
  attributes: Attribute[];

  @OneToMany(() => Gallery, (gallery) => gallery.book,{ cascade: ['insert', 'update'] } )
  @Property()
  galleries: Gallery[];

  @OneToMany(() => OrderDetail, (orderDetail) => OrderDetail)
  details: OrderDetail[]
}

