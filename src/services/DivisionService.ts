import { DivisionInsert, DivisionUpdate } from "../models/DivisionCreation";
import { Like } from "typeorm";
import { Division } from "../entities/Division";
import { QueryParamsModelDivisionSearch } from "../models/queryParamsModel";
import { hashPassword } from "../utils/password.utils";
import * as moment from "moment";
class DivisionService {
  async getQuery(query: QueryParamsModelDivisionSearch): Promise<any> {
    const {limit, page, addressCityId, search = ""} = query
    let condition = {};
    if (addressCityId !== undefined || addressCityId !== null) {
      condition = {
        ...condition,
        addressCity: {
          id: addressCityId
        },
      };
    }
    const data: Division[] = await Division.findManyQuery({
      relations: ["addressCity"],
      where: {
        name: Like(`%${search || ""}%`),
        ...condition,
      },
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Division.count();
    return {
      data,
      total,
    };
  }

  async create(divisionData: DivisionInsert, addressCityId: number) {
    const division = divisionData.toDivision()
    const username = "P" + Math.floor(new Date().valueOf() * Math.random())
    division.username = username
    division.firstPassword = (Math.floor(Math.random() * 900000) + 100000).toString()
    division.password = await hashPassword((Math.floor(Math.random() * 900000) + 100000).toString())
    division.isChangedDefaultPassword = false

    await division.assignAddressCity(addressCityId)
    const data = await Division.save(division)
    return data
  }

  async update(divisionData: DivisionUpdate, addressCityId: number, divisionId: number) {
    const divisionFound = await Division.findOneAndThrow({where: {id: divisionId}})
    const division = divisionData.toDivision()
    await division.assignAddressCity(addressCityId)
    const data = await Division.save({...divisionFound, ...division})
    return data
  }

  async updatePassword(password: string, divisionId: number) {
    const divisionFound: Division = await Division.findOneAndThrow({where: {id: divisionId}})
    const division = new Division()
    const newPassword = await hashPassword(password)
    division.isChangedDefaultPassword = true
    division.password = newPassword
    division.updatePasswordAt = moment().unix()
    const data = await Division.save({...divisionFound, ...division})
    return data
  }
}

export const divisionService = new DivisionService();
