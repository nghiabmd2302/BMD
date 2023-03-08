import { Like } from "typeorm";
import { Customer } from "../../entities/CustomerEntity";
import { QueryParamsModelCustomerSearch } from "../../models/queryParamsModel";
class CustomerService {
  async getQuery(query: QueryParamsModelCustomerSearch): Promise<any> {
    const {search, limit, page, schoolId, divisionId, classroomId} = query
    let condition = {};
    if (schoolId !== undefined || schoolId !== null) {
      condition = {
        ...condition, school: schoolId,
      };
    }
    if (classroomId !== undefined || classroomId !== null) {
      condition = { ...condition, classroom: classroomId };
    }
    const data: Customer[] = await Customer.findManyQuery({
        where: {
            name: Like(`%${search || ""}%`),
            ...condition
        },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Customer.count();
    return {
      data,
      total,
    };
  }
}

export const customerService = new CustomerService();
