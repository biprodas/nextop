import { IUser } from "~/types";

export interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
}
