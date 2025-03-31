export const GET_ALL_PRIORITY = "GET_ALL_PRIORITY";

export interface PriorityState {
  listPriority: Priority[];
}

export interface Priority {
  id: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
}
