import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Book } from "./BookEntity";

@Entity("bookattributes")
export class Attribute {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @Column()
  value: string;

  @Column()
  attribute: number;

  @Column()
  finalPrice: number;

  @ManyToOne(() => Book, (book) => book.attributes)
  book: number;
}
