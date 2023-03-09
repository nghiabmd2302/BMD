import "reflect-metadata";
import Staff from "../entities/StaffEntity";
import { DataSource } from "typeorm";
import { AddressCity } from "../entities/AddressCityEntity";
import { AddressDistrict } from "../entities/AddressDistrictEntity";
import { AddressWard } from "../entities/AddressWardEntity";
import { Author } from "../entities/AuthorEntity";
import { Banner } from "../entities/BannerEntity";
import { BannerTeacher } from "../entities/BannerTeacherEntity";
import { BannerWeb } from "../entities/BannerWebEntity";
import { Category } from "../entities/CategoryEntity";
import { Cover } from "../entities/CoverEntity";
import { Publisher } from "../entities/PublisherEntity";
import { Grade } from "../entities/GradeEntity";
import { Book } from "../entities/BookEntity";
import { Customer } from "../entities/CustomerEntity";
import { Gallery } from "../entities/GalleryEntity";
import { Attribute } from "../entities/AttributeEntity";
import { Order } from "../entities/OrderEntity";
import { OrderDetail } from "../entities/OrderDetailEntity";
import { CoreEntity } from "../entities/TestEntity";
import { Promotion } from "../entities/PromotionEntity";
import { News } from "../entities/NewsEntity";
import { Notification } from "../entities/NotificationEntity";
import { Permission } from "../entities/PermissionEntity";
import { Division } from "../entities/DivisionEntity";
import { Media } from "../entities/MediaEntity";


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
    Staff,
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
