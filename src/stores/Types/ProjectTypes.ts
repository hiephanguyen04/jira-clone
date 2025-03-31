export const GET_ALL_PROJECT = "GET_ALL_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const ASSIGN_USER_PROJECT = "ASSIGN_USER_PROJECT";
export const PROJECT_DETAIL = "PROJECT_DETAIL";
export const GET_TASK_DETAIL = "GET_TASK_DETAIL";
export const CHANGE_ASSIGNESS = "CHANGE_ASSIGNESS";
export const CHANGE_TASK_MODAL = "CHANGE_TASK_MODAL";
export const REMOVE_USER_ASSIGN = "REMOVE_USER_ASSIGN";

export interface Project {
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName?: string;
  creator?: {
    id: number;
    name: string;
  };
  members?: Member[];
  alias?: string;
  deleted?: boolean;
}

export interface Member {
  userId: number;
  name: string;
  avatar: string;
}

export interface TaskDetail {
  id: number;
  taskName: string;
  description: string;
  statusId: number;
  statusName?: string;
  priorityId: number;
  priorityName?: string;
  projectId: number;
  typeId: number;
  typeName?: string;
  assigness: {
    id: number;
    avatar: string;
    name: string;
  }[];
  [key: string]: any;
}

export interface ProjectState {
  listProject: Project[];
  editProject: Project[];
  projectDetail: any;
  taskDetail: TaskDetail;
}

export interface CreateProjectParams {
  projectName: string;
  description: string;
  categoryId: number;
  alias?: string;
}

export interface UpdateProjectParams extends CreateProjectParams {
  id: number;
}

export interface AssignUserParams {
  projectId: number;
  userId: number;
}

export interface CreateTaskParams {
  listUserAsign: number[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}

export interface UpdateTaskStatusParams {
  taskId: number;
  statusId: string;
}

export interface UpdateTaskParams {
  taskId: number;
  [key: string]: any;
}
