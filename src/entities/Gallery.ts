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
@Entity("bookgalleries")
export class Gallery extends Core{
  @Column()
  thumbnail: string

  @ManyToOne(() => Book, (book) => book.galleries)
  book: Book;
}

