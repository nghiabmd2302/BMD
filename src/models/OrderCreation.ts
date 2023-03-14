import { Property } from "@tsed/common"
import { OrderDetail } from "../entities/OrderDetail"
import { Order } from "../entities/Order"

export class OrderInsert {
    @Property()
    note: string

    @Property()
    isDeleted: boolean

    @Property()
    paymentStatus: string

    @Property()
    paymentType: string

    @Property()
    status: string

    @Property()
    code: string

    @Property()
    address: string

    @Property()
    phone: string

    @Property()
    name: string

    @Property()
    expoToken: string

    @Property()
    kvCode: number

    @Property()
    kvId: number

    toOrder () {
        const order = new Order()
        order.name = this.name
        order.note = this.note
        order.isDeleted = this.isDeleted
        order.paymentStatus = this.paymentStatus
        order.paymentType = this.paymentType
        order.status = this.status
        order.code = this.code
        order.address = this.address
        order.phone = this.phone
        order.name = this.name
        order.expoToken = this.expoToken
        order.kvCode = this.kvCode
        order.kvId = this.kvId
        return order
    }
}