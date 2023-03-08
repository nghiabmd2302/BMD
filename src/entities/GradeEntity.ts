import { Entity,OneToMany, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Property} from "@tsed/common";
import { Book } from "./BookEntity";
import { Core } from "../core/entity/Core";

@Entity("grade")
export class Grade extends Core{
    @Column()
    name: string

    @Column({default: false})
    isDeleted: boolean

    @OneToMany(() => Book, (book) => book.grade)
    book: Book
}