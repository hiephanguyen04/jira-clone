import { baseService } from "./baseService";

export class ProjectService extends baseService {
  // constructor() {
  //   super();
  // }

  getAllProject = () => {
    return this.get(`/Project/getAllProject`);
  };
  createProject = (data) => {
    return this.post(`/Project/createProjectAuthorize`, data);
  };
  updateProject = (data) => {
    return this.put(`/Project/updateProject?projectId=${data.id}`, data);
  };

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
  getProjectDetail = (projectId) => {
    return this.get(`/Project/getProjectDetail?id=${projectId}`);
  };

  createTask = (data) => {
    return this.post(`/Project/createTask`, data);
  };
  assignUserProject = (data) => {
    return this.post(`/Project/assignUserProject`, data);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`/Project/removeUserFromProject`, userProject);
  };
  getTaskDetail = (idTask) => {
    return this.get(`/Project/getTaskDetail?taskId=${idTask}`);
  };
  updateTask = (taskUpdate) => {
    return this.post(`/Project/updateTask`, taskUpdate);
  };
  removeTask = (idTask) => {
    return this.delete(`/Project/removeTask?taskId=${idTask}`);
  };

  updateStatusTask = (taskStatusUpdate) => {
    return this.put(`/Project/updateStatus`, taskStatusUpdate);
  };
}

export const projectService = new ProjectService();
