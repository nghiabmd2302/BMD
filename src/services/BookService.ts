import { AttributeInsert } from "../models/AttributeCreation";
import { GalleryInsert } from "../models/GalleryCreation";
import { Like } from "typeorm";
import { Book } from "../entities/Book";
import { QueryParamsModelBookSearch } from "../models/queryParamsModel";
import { BookInsert } from "../models/BookCreation";
class BookService {
  async getQuery(query: QueryParamsModelBookSearch): Promise<any> {
    let condition = {};
    if (query.authorId !== undefined || query.authorId !== null) {
      condition = {
        ...condition,
        author: query.authorId,
      };
    }
    if (query.categoryId !== undefined || query.categoryId !== null) {
      condition = { ...condition, category: query.categoryId };
    }
    if (query.coverId !== undefined || query.coverId !== null) {
      condition = { ...condition, cover: query.coverId };
    }

    if (query.gradeId !== undefined || query.categoryId !== null) {
      condition = { ...condition, gradeId: query.categoryId };
    }

    if (query.publisherId !== undefined || query.publisherId !== null) {
      condition = { ...condition, publisher: query.publisherId };
    }

    if (query.isHighlight !== undefined || query.isHighlight !== null) {
      condition = { ...condition, isHighlight: query.isHighlight };
    }

    if (query.isOutOfStock !== undefined || query.isOutOfStock !== null) {
      condition = { ...condition, isOutOfStock: query.isOutOfStock };
    }

    if (query.type !== undefined || query.type !== null) {
      condition = { ...condition, type: query.type };
    }

    const data: Book[] = await Book.findManyQuery({
      relations: {
        grade: true,
        cover: true,
        category: true,
        author: true,
        publisher: true,
      },
      where: {
        name: Like(`%${query.search || ""}%`),
        ...condition,
      },
      skip: query.limit * (query.page - 1) || 0,
      take: Number(query.limit) || 10,
    });
    const total = await Book.count();

    // const dataFake = await Book.createQueryBuilder("book")
    //   .leftJoinAndSelect("book.grade", "grade")
    //   .where("grade.id = :id", { id: query.gradeId })
      
    //   .getOne();
    // console.log(dataFake);
    return {
      data,
      total,
    };
  }

  async createBook(
    bookData: BookInsert,
    categoryId: number,
    gradeId: number,
    coverId: number,
    authorId: number,
    publisherId: number,
    galleries: GalleryInsert[],
    attributes: AttributeInsert[]
  ) {
    const book = bookData.toBook();

    //get gallery from query request
    const gallery = await Promise.all(
      galleries.map((item) => {
        return item.toGallery();
      })
    );

    //get attribute from query request
    const attribute = await Promise.all(
      attributes.map((item) => {
        return item.toAttribute();
      })
    );

    //get mutiple entity and check them exist
    await book.assignCategory(categoryId);
    await book.assignGrade(gradeId);
    await book.assignCover(coverId);
    await book.assignAuthor(authorId);
    await book.assignPublisher(publisherId);

    book.galleries = gallery;
    book.attributes = attribute;

    const data = await Book.save(book);
    return data;
  }
}

export const bookService = new BookService();
