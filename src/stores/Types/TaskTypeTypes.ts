export const GET_ALL_TASK_TYPE = "GET_ALL_TASK_TYPE";

export interface TaskTypeState {
  listTaskType: TaskType[];
}

export interface TaskType {
  id: number;
  taskType: string;
  deleted: boolean;
  alias: string;
}
