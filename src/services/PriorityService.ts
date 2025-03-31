import { AxiosResponse } from "axios";
import { Priority } from "stores/Types/PriorityTypes";
import { baseService } from "./baseService";

interface PriorityResponse {
  content: Priority[];
  statusCode: number;
  message: string;
}

export class PriorityService extends baseService {
  getAllPriority = (): Promise<AxiosResponse<PriorityResponse>> => {
    return this.get(`/Priority/getAll`);
  };
}

export const priorityService = new PriorityService();
