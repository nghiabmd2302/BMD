import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity("author")
export class Author extends Core {
  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Book, (book) => book.cover)
  book: Book;
}
