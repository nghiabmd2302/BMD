import { Property } from "@tsed/common"

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
}