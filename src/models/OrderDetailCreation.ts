import { Default, Property} from "@tsed/common";
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
    book: number

    finalPrice: number

    originPrice: number

}