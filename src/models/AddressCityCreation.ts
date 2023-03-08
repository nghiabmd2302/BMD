import { Default, Property} from "@tsed/common";

export class AddressCityInsert {
    @Property()
    @Default(false)
    isBlock: boolean

    @Property()
    priority: number

    @Property()
    code: number

    @Property()
    nameWithType: string

    @Property()
    type: string

    @Property()
    slug: string

    @Property()
    name: string

    @Property()
    feeDelivery: number

}
