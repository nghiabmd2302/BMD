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
  UseAuth
} from "@tsed/common";
import { CustomAuthMiddleware, VerificationJWT } from "../../middlewares/auth";
import { CategoryInsert } from "../../models/CategoryCreation";
import { Category } from "../../entities/Category";
import { QueryParamsModelMoreSearch } from "../../models/queryParamsModel";
import { Docs } from "@tsed/swagger";
import { Like } from "typeorm";
import { Responses } from "../../services/responseService/ResponseService";
import { Response } from "express";
import { categoryService } from "../../services/CategoryService";

@Controller("/category")
@Docs("/docs_admin")
export class CategoryController {
  @Get("/")
  @UseAuth(VerificationJWT)
  async get(
    @HeaderParams("token") token: string,
    @QueryParams() query: QueryParamsModelMoreSearch,
    @Res() res: Response
  ) {
    const categories: Category[] = await categoryService.getQuery(query)
    return Responses.sendOK(res, categories);
  }

  @Post("/")
  @UseAuth(VerificationJWT)
  async create(
    @HeaderParams("token") token: String,
    @BodyParams("category") categoryData: CategoryInsert,
    @Res() res: Response
  ) {
    const data = await Category.save(categoryData)
    return Responses.sendOK(res, data);
  }

  @Post("/:categoryId/update")
  @UseAuth(VerificationJWT)
  async update(
    @BodyParams("category") categoryData: CategoryInsert,
    @HeaderParams("token") token: String,
    @PathParams("categoryId") categoryId: number,
    @Res() res: Response
  ) {
    await Category.updateCondition({id: categoryId}, {...categoryData})
    return Responses.sendOK(res, {});
  }

  @Post("/:categoryId/delete")
  @UseAuth(VerificationJWT)
  async delete(
    @HeaderParams("token") token: String,
    @PathParams("categoryId") categoryId: number,
    @Res() res: Response
  ) {
    await Category.delete({id: categoryId})
    return Responses.sendOK(res, {});
  }
}
