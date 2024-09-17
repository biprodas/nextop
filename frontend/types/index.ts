export type CurrentUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  shortBio: string;
  image: string;
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
  isAdmin?: boolean;
  status?: string;
  roles?: string[];
}

export type ITokenResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

// ------
export type Unpromisify<T> = T extends Promise<infer R> ? R : T;

export type AnyObject = Record<string, any>;
export type AnyArray = unknown[];
export type AnyObjectOrArray = AnyObject | AnyArray;

export type ApiResponse<T = any> = {
  data: T;
  status_code: number;
  message: string;
  detail?: string;
};

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  options: {
    paginationSettings: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      nextPage: number;
      previousPage: number;
      limit: number;
    };
  };
}

export type ServerSideResponse<T = any> = ApiResponse<T>;

export type SocketStatus =
  | "CONNECTING"
  | "OPEN"
  | "CLOSED"
  | "CLOSING"
  | "UNINSTANTIATED";

export enum ChatShowType {
  Transcription = "transcription",
  Translation = "translation",
  Both = "both",
}
