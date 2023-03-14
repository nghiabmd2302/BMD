import { Property } from "@tsed/common";
import { Attribute } from "../entities/Attribute";
export class AttributeInsert {
    @Property()
    value: string;
  
    @Property()
    attribute: number;
  
    @Property()
    finalPrice: number;

    async toAttribute() {
      const attribute = new Attribute();
      attribute.value = this.value;
      attribute.attribute = this.attribute;
      attribute.finalPrice = this.finalPrice;
      return attribute;
    }
  }