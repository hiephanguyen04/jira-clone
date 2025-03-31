import { AxiosResponse } from "axios";
import { Status } from "stores/Types/StatusTypes";
import { baseService } from "./baseService";

interface StatusResponse {
  content: Status[];
  statusCode: number;
  message: string;
}

export class StatusService extends baseService {
  getAllStatus = (): Promise<AxiosResponse<StatusResponse>> => {
    return this.get(`/Status/getAll`);
  };
}

export const statusService = new StatusService();
