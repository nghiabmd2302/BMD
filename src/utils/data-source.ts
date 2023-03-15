import "reflect-metadata";
import {Staff} from "../entities/Staff";
import { DataSource } from "typeorm";
import { AddressCity } from "../entities/AddressCity";
import { AddressDistrict } from "../entities/AddressDistrict";
import { AddressWard } from "../entities/AddressWard";
import { Author } from "../entities/Author";
import { Banner } from "../entities/Banner";
import { BannerTeacher } from "../entities/BannerTeacher";
import { BannerWeb } from "../entities/BannerWeb";
import { Category } from "../entities/Category";
import { Cover } from "../entities/Cover";
import { Publisher } from "../entities/Publisher";
import { Grade } from "../entities/Grade";
import { Book } from "../entities/Book";
import { Customer } from "../entities/Customer";
import { Gallery } from "../entities/Gallery";
import { Attribute } from "../entities/Attribute";
import { Order } from "../entities/Order";
import { OrderDetail } from "../entities/OrderDetail";
import { CoreEntity } from "../entities/Test";
import { Promotion } from "../entities/Promotion";
import { News } from "../entities/News";
import { Notification } from "../entities/Notification";
import { Permission } from "../entities/Permission";
import { Division } from "../entities/Division";
import { Media } from "../entities/Media";
import { School } from "../entities/School";
import { Classroom } from "../entities/Classroom";
import { Teacher } from "../entities/Teacher";
import { Configuration } from "../entities/Configuration";
import { Role } from "../entities/Role";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "",
  database: "tesst",
  synchronize: true,
  logging: false,
  cache: {
    duration: 30000,
  },
  entities: [
    Role,
    Staff,
    Configuration,
    Teacher,
    Classroom,
    School,
    AddressCity,
    Category,
    AddressDistrict,
    AddressWard,
    Author,
    Banner,
    BannerTeacher,
    BannerWeb,
    Cover,
    Publisher,
    Grade,
    Gallery,
    Book,
    Attribute,
    Customer,
    Order,
    OrderDetail,
    CoreEntity,
    Promotion,
    News,
    Notification,
    Permission,
    Division,
    Media
  ],
});

export const ConnectDb = async () => {
  let dataSource: DataSource;
  dataSource = await AppDataSource.initialize();
};
export default AppDataSource;
