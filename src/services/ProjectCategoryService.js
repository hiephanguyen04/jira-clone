import { baseService } from "./baseService";

export class ProjectCategoryService extends baseService {
  // constructor() {
  //   super();
  // }

  getAllProjectCategory = () => {
    return this.get(`/ProjectCategory`);
  };
}

export const projectCategoryService = new ProjectCategoryService();
