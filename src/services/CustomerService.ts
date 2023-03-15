import { CustomerInsert, CustomerPassword } from "../models/CustomerCreation";
import { Like } from "typeorm";
import { Customer } from "../entities/Customer";
import { QueryParamsModelCustomerSearch } from "../models/queryParamsModel";
import { comparePassword, hashPassword } from "../utils/password.utils";
import { Error } from "./errorService/ErrorService";
import {Responses} from "./responseService/ResponseService"
import {Response} from "express"
import { generateToken } from "../utils/jwt";
class CustomerService {
  async getQuery(query: QueryParamsModelCustomerSearch): Promise<any> {
    const { search, limit, page, schoolId, divisionId, classroomId } = query;
    let condition = {};
    if (schoolId !== undefined || schoolId !== null) {
      condition = {
        ...condition,
        school: schoolId,
      };
    }
    if (classroomId !== undefined || classroomId !== null) {
      condition = { ...condition, classroom: classroomId };
    }

    if (divisionId !== undefined || divisionId !== null) {
      condition = { ...condition, division: divisionId };
    }
    const data: Customer[] = await Customer.findManyQuery({
      relations: ["school", "classroom"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
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

  async createCutomer(
    customerData: CustomerInsert,
    facebookId: string,
    googleId: string,
    zaloId: string,
    appleId: string
  ) {
    const customer = customerData.toCustomer();
    const password = await hashPassword(customerData.password);
    const data = await Customer.save({
      ...customer,
      facebookId,
      googleId,
      zaloId,
      appleId,
      password,
    });
    return data;
  }

  async updateCustomer(customerData: CustomerInsert, customerId: number) {
    const customer = customerData.toCustomer();
    const customerFound = await Customer.findQuery({
      where: { id: customerId },
    });
    const password = await hashPassword(customerData.password);
    customer.password = password;

    const data = await Customer.save({ ...customerFound, ...customer });
    return data;
  }

  async updatePassword(customer: CustomerPassword, customerId: number) {
    if (customer.oldPassword === customer.newPassword) {
      return Error.badRequest("Mật khẩu mới không được trùng mật khẩu cũ!");
    }

    const customerFound: Customer = await Customer.findQuery({
      where: { id: customerId },
    });

    await comparePassword(customer.oldPassword, customerFound.password);

    let password = await hashPassword(customer.newPassword);

    const data = await Customer.save({ ...customerFound, password });
    return data;
  }

  async social(res: Response, facebookId: string, zaloId: string, appleId: string, googleId: string) {
    let options = {}
    if(facebookId) {
      options = {...options, facebookId}
    }
    if(zaloId) {
      options = {...options, zaloId}
    }
    if(googleId) {
      options = {...options, googleId}
    }
    if(appleId) {
      options = {...options, appleId}
    }

    const customer = await Customer.findOne({where: options})
    if (!customer) {
      return Responses.sendError(res, {});
    } else {
      generateToken(customer, res);
    }
  }
}

export const customerService = new CustomerService();
