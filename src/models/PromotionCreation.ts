import { Property} from "@tsed/common";

export class PromotionInsert{
    
    @Property()
    value: number;
  
    @Property()
    minMoneyTotalCanApprove: number;
  
    @Property()
    type: string;
  
    @Property()
    isDeleted: boolean;
  
    @Property()
    endAt: number;
  
    @Property()
    startAt: number;
  
    @Property()
    code: string;
  
    @Property()
    title: string;
  
    @Property()
    thumbnail: string;
  
    @Property()
    image: string;
  
    @Property()
    description: string
}