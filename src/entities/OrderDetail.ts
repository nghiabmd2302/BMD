
import { Core } from "../core/entity/Core";
import { Entity, Column, ManyToOne} from "typeorm"

import { Book } from "./Book";
import { Order } from "./Order";
@Entity("orderdetail")
export class OrderDetail extends Core{
    @Column()
    quantity: number

    @Column()
    attributeId1: number

    @Column()
    attributeId2: number

    @Column()
    finalPrice: number

    @Column()
    originPrice: number

    @ManyToOne(() => Book, (book) => book.orderDetails)
    book: Book

    @ManyToOne(()=> Order, (order) => order.details)
    order: Order

    async assignBook (bookId: number) {
        this.book = await Book.findOneAndThrow({where: {id: bookId}}, bookId)
        this.finalPrice = this.book.finalPrice
        this.originPrice = this.book.originPrice
    }
}