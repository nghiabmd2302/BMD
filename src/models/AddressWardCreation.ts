import { Property, Default} from "@tsed/common";

export class AddressWardInsert {
  @Property()
  @Default(false)
  isBlock: boolean;

  @Property()
  parentCode: number;

  @Property()
  pathWithType: string;

  @Property()
  path: string;

  @Property()
  nameWithType: string;

  @Property()
  priority: number;

  @Property()
  code: number;

  @Property()
  type: string;

  @Property()
  slug: string;

  @Property()
  name: string;

  @Property()
  feeDelivery: number;
}
