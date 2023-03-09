import { Property } from "@tsed/common";
export class QueryParamsModel {
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;
}

export class QueryParamsModelParentCode{
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;

  @Property()
  parentCode: string;
}

export class QueryParamsModelLessSearch {
  @Property()
  limit: number;

  @Property()
  page: number;
}

export class QueryParamsModelMoreSearch {
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;

  @Property()
  parentId: number;

  @Property()
  root: boolean;

  @Property()
  level: number;
}

export class QueryParamsModelBookSearch {
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;

  @Property()
  sortPrice: string;

  @Property()
  gradeId: number;

  @Property()
  categoryId: number;

  @Property()
  sortPromotion: boolean

  @Property()
  coverId: number;

  @Property()
  publisherId: number;

  @Property()
  authorId: number;

  @Property()
  isHighlight: boolean

  @Property()
  isPreOrder: boolean

  @Property()
  isOutOfStock: boolean

  @Property()
  type: string

}

export class QueryParamsModelCustomerSearch {
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;

  @Property()
  schoolId: number

  @Property()
  divisionId: number

  @Property()
  classroomId: number

  @Property()
  isDeleted: boolean
}

export class QueryParamsModelOrderSearch {
  @Property()
  limit: number;

  @Property()
  page: number;

  @Property()
  search: string;

  @Property()
  status: string;

  @Property()
  addressCityId: number;

  @Property()
  addressDistrictId: number;

  @Property()
  addressWardId: number;

  @Property()
  from: string;

  @Property()
  to: string;
}

export class QueryParamsModelDivisionSearch extends QueryParamsModel{
  @Property()
  addressCityId: number;
}