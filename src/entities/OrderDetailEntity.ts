
import { Entity,OneToMany, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm"

import { Book } from "./BookEntity";
import { Order } from "./OrderEntity";
@Entity("orderdetail")
export class OrderDetail {
    @PrimaryGeneratedColumn("increment")
    id: number

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @Column()
    quantity: number

    @Column()
    attributeId1: number

    @Column()
    attributeId2: number

    @ManyToOne(() => Book, (book) => book.details)
    book: number

    @ManyToOne(()=> Order, (order) => order.details)
    order: Order

}