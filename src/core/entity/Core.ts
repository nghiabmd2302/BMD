import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from "typeorm";
const moment = require("moment")
import { Error } from "../../services/errorService/ErrorService";

@Entity()
export abstract class Core extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  createdAt: number;

  @Column("int")
  updatedAt: number;

  constructor() {
    super();
  }

  @BeforeInsert()
  createTimestamp() {
    const milliseconds = moment().unix()
    this.updatedAt = milliseconds;
    this.createdAt = milliseconds;
  }

  static async findOneAndThrow(options: any, id: number = 0): Promise<any> {
    try {
      return await super.findOneOrFail(options);
    } catch (err) {
      return Error.badRequest(
        `Không tìm thấy ${this.name} nào tồn tại với id là ${id}`,
        {}
      );
    }
  }

  static save(options?: any): Promise<any> {
    const milliseconds = moment().unix()
    options.updatedAt = milliseconds;
    options.createdAt = milliseconds;
    return super.save(options);
  }

  static async findQuery(options: any): Promise<any> {
    try {
      const data = await super.findOne(options);
      if (!data) {
        throw Error.notFound("Không tồn tại", {});
      }
      return data;
    } catch (err) {
      throw Error.badRequest(err.message, {});
    }
  }

  static async findManyQuery(options: any): Promise<any> {
    try {
      const data = await super.find(options);
      return data;
    } catch (err) {
      throw Error.badRequest(err.message, {});
    }
  }

  static async updateCondition(condition: object, options: any): Promise<any> {
    const milliseconds = moment().unix()
    try {
      const data = await super.update(condition, {
        ...options,
        updatedAt: milliseconds,
      });
      return data;
    } catch (err) {
      throw Error.badRequest(err.message, {});
    }
  }

  static async delete(condition: object): Promise<any> {
    try {
      const data = await super.delete(condition);
      return data;
    } catch (err) {
      throw Error.badRequest(err.message, {});
    }
  }
}
