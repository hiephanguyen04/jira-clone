import { Comment } from "stores/Types/CommentTypes";
import { baseService } from "./baseService";

interface CommentResponse {
  content: Comment[];
  statusCode: number;
  message: string;
}

export class CommentService extends baseService {
  // Add methods as needed
}

export const commentService = new CommentService();
