import {
  Entity,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Property } from "@tsed/common";
import { Book } from "./Book";
import { Core } from "../core/entity/Core";
import { School } from "./School";
import { Classroom } from "./Classroom";

@Entity("grade")
export class Grade extends Core {
  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Book, (book) => book.grade)
  book: Book[];

  @OneToMany(() => Classroom, (classroom) => classroom.grade)
  classroom: Classroom[]

  @ManyToOne(() => School, (school) => school.grades)
  school: School

  @ManyToOne(() => School, (school) => school.orderGrades)
  orderSchool: School

}
