import ErrorHander from "../../middlewares/ErrorHandler";
import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
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
    const date = new Date();
    const milliseconds: number = date.getTime();
    this.updatedAt = milliseconds;
    this.createdAt = milliseconds;
  }


  static save(options?: any): Promise<any> {
    const date = new Date();
    const milliseconds: number = date.getTime();
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
    const date = new Date();
    const milliseconds: number = date.getTime();
    try {
      const data = await super.update(condition, {
        ...options, updatedAt: milliseconds
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
