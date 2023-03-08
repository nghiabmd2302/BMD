import { Grade } from "../../entities/GradeEntity";
import { QueryParamsModelLessSearch} from "../../models/queryParamsModel";
class GradeService {
  async getQuery(query: QueryParamsModelLessSearch): Promise<any> {
    const {limit, page} = query
    
    const data: Grade[] = await Grade.findManyQuery({
        skip: limit * (page - 1) || 0,
        take: Number(limit) || 10,
    });
    const total = await Grade.count();
    return {
      data,
      total,
    };
  }
}

export const gradeService = new GradeService();
