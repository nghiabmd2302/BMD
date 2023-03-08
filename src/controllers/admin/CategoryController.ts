import {
  BodyParams,
  Controller,
  Get,
  Post,
  UseBefore,
  HeaderParams,
  QueryParams,
  PathParams,
  Res,
} from "@tsed/common";
import { CustomAuthMiddleware } from "../../middlewares/auth";
import { CategoryInsert } from "../../models/CategoryCreation";
import { Category } from "../../entities/CategoryEntity";
import { QueryParamsModelMoreSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { UseAuth } from "@tsed/platform-middlewares";
import { Like } from "typeorm";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { categoryService } from "../../services/adminService/CategoryService";

@Controller("/category")
@UseAuth(CustomAuthMiddleware, { role: "admin" })
@Docs("/docs_admin")
export class CategoryController {
  @Get("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelMoreSearch,
    @Res() res: Response
  ) {
    const categories: Category[] = await categoryService.getQuery(query)
    return Responses.resCount(res, categories);
  }

  @Post("/")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("category") categoryData: CategoryInsert,
    @Res() res: Response
  ) {
    const data = await Category.save(categoryData)
    return Responses.resOk(res, data);
  }

  @Post("/:categoryId/update")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async update(
    @BodyParams("category") categoryData: CategoryInsert,
    @HeaderParams("token") token: String,
    @PathParams("categoryId") categoryId: number,
    @Res() res: Response
  ) {
    await Category.updateCondition({id: categoryId}, {...categoryData})
    return Responses.resOk(res, {});
  }

  @Post("/:categoryId/delete")
  @UseBefore(CustomAuthMiddleware, { role: "admin" })
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("categoryId") categoryId: number,
    @Res() res: Response
  ) {
    await Category.delete({id: categoryId})
    return Responses.resOk(res, {});
  }
}
