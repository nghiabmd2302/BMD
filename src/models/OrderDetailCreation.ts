import { Default, Property} from "@tsed/common";
import { OrderDetail } from "../entities/OrderDetail";
export class OrderDetailInsert{
    
    @Property()
    @Default(0)
    quantity: number

    @Property()
    @Default(0)
    attributeId1: number

    @Property()
    @Default(0)
    attributeId2: number

    @Property()
    bookId: number

    async toOrderDetail () {
        const orderDetail = new OrderDetail()
        orderDetail.quantity = this.quantity
        orderDetail.attributeId1 = this.attributeId1
        orderDetail.attributeId2 = this.attributeId2
        await orderDetail.assignBook(this.bookId)
        return orderDetail
    }

}