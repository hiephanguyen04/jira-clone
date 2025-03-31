import { AxiosResponse } from "axios";
import { TaskType } from "stores/Types/TaskTypeTypes";
import { baseService } from "./baseService";

interface TaskTypeResponse {
  content: TaskType[];
  statusCode: number;
  message: string;
}

export class TaskTypeService extends baseService {
  getAllTaskType = (): Promise<AxiosResponse<TaskTypeResponse>> => {
    return this.get("/TaskType/getAll");
  };
}

export const taskTypeService = new TaskTypeService();
