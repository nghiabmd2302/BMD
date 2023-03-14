import { Core } from "../core/entity/Core";
import {
  Entity,
  Column,
  Generated,
  OneToMany,
} from "typeorm";
import { Book } from "./Book";

@Entity("category")
export class Category extends Core{
  @Column({
    type: "boolean",
    default: true,
  })
  isShowInApp: Boolean;

  @Column()
  thumbnail: string;

  @Column({default: 0})
  priority: number;

  @Column()
  name: string;

  @Column()
  level: number;

  @Column({ default: null })
  parent1: number;

  @Column({ default: null })
  parent2: number;

  @Column({ default: null })
  parent3: number;

  @Column({ default: null })
  parent4: number;

  @Column({ default: null })
  parent5: number;

  @Column({ default: null })
  parent6: number;

  @Column({ default: null })
  parent7: number;

  @Column({ default: null })
  parent8: number;

  @OneToMany(() => Book, (book) => book.category)
  book: Book;
}
