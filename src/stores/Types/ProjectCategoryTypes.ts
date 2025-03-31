export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";

export interface ProjectCategoryState {
  listCategory: ProjectCategory[];
}

export interface ProjectCategory {
  id: number;
  projectCategoryName: string;
  description?: string;
  deleted: boolean;
  alias?: string;
}
