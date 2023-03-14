import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { Book } from "./Book";

@Entity("publisher")
export class Publisher extends Core{
  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Book, (book) => book.publisher)
  book: Book;
}
