import { AxiosResponse } from "axios";
import {
  AssignUserParams,
  CreateProjectParams,
  CreateTaskParams,
  Project,
  TaskDetail,
  UpdateProjectParams,
  UpdateTaskParams,
  UpdateTaskStatusParams,
} from "stores/Types/ProjectTypes";
import { baseService } from "./baseService";

interface ProjectResponse {
  content: Project[];
  statusCode: number;
  message: string;
}

interface ProjectDetailResponse {
  content: Project;
  statusCode: number;
  message: string;
}

interface TaskDetailResponse {
  content: TaskDetail;
  statusCode: number;
  message: string;
}

interface GenericResponse {
  content: any;
  statusCode: number;
  message: string;
}

export class ProjectService extends baseService {
  getAllProject = (): Promise<AxiosResponse<ProjectResponse>> => {
    return this.get(`/Project/getAllProject`);
  };

  createProject = (
    data: CreateProjectParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.post(`/Project/createProjectAuthorize`, data);
  };

  updateProject = (
    data: UpdateProjectParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.put(`/Project/updateProject?projectId=${data.id}`, data);
  };

  deleteProject = (id: number): Promise<AxiosResponse<GenericResponse>> => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (
    projectId: number
  ): Promise<AxiosResponse<ProjectDetailResponse>> => {
    return this.get(`/Project/getProjectDetail?id=${projectId}`);
  };

  createTask = (
    data: CreateTaskParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.post(`/Project/createTask`, data);
  };

  assignUserProject = (
    data: AssignUserParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.post(`/Project/assignUserProject`, data);
  };

  deleteUserFromProject = (
    userProject: AssignUserParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.post(`/Project/removeUserFromProject`, userProject);
  };

  getTaskDetail = (
    idTask: number
  ): Promise<AxiosResponse<TaskDetailResponse>> => {
    return this.get(`/Project/getTaskDetail?taskId=${idTask}`);
  };

  updateTask = (
    taskUpdate: UpdateTaskParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.post(`/Project/updateTask`, taskUpdate);
  };

  removeTask = (idTask: number): Promise<AxiosResponse<GenericResponse>> => {
    return this.delete(`/Project/removeTask?taskId=${idTask}`);
  };

  updateStatusTask = (
    taskStatusUpdate: UpdateTaskStatusParams
  ): Promise<AxiosResponse<GenericResponse>> => {
    return this.put(`/Project/updateStatus`, taskStatusUpdate);
  };
}

export const projectService = new ProjectService();
