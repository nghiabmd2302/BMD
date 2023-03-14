import { Core } from "../core/entity/Core";
import { Entity, Column,OneToMany } from "typeorm"
import { Book } from "./Book";


@Entity("cover")
export class Cover extends Core{
    @Column()
    name: string

    @Column({default: false})
    isDeleted: boolean
    
    @OneToMany(() => Book, (book) => book.cover)
    book: Book
}