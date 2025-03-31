export const GET_ALL_STATUS = "GET_ALL_STATUS";

export interface StatusState {
  listStatus: Status[];
}

export interface Status {
  id: number;
  statusName: string;
  statusCategory: string;
  statusColor: string;
  statusIcon?: string;
  deleted: boolean;
  alias: string;
}
