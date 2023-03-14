import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Book } from "./Book";

@Entity("bookattributes")
export class Attribute extends Core{
  @Column()
  value: string;

  @Column()
  attribute: number;

  @Column()
  finalPrice: number;

  @ManyToOne(() => Book, (book) => book.attributes)
  book: number;
}
