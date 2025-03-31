import { AxiosResponse } from "axios";
import { ProjectCategory } from "stores/Types/ProjectCategoryTypes";
import { baseService } from "./baseService";

interface ProjectCategoryResponse {
  content: ProjectCategory[];
  statusCode: number;
  message: string;
}

export class ProjectCategoryService extends baseService {
  getAllProjectCategory = (): Promise<
    AxiosResponse<ProjectCategoryResponse>
  > => {
    return this.get(`/ProjectCategory`);
  };
}

export const projectCategoryService = new ProjectCategoryService();
