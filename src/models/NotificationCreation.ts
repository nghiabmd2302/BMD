import { Property } from "@tsed/common";

export class NotificationInsert {
    @Property()
    isDeleted: boolean;
  
    @Property()
    title: string;
  
    @Property()
    body: string;
  
    @Property()
    isNoticed: boolean;
}
