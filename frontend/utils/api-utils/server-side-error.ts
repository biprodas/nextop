import { ApiResponse } from "~/types";

export default class ServerSideError {
  static error<T>(error: unknown, status_code = 500): T {
    const _error = error as ApiResponse;
    return {
      message:
        _error.message ||
        _error.detail ||
        (error as any).error?.message ||
        "Something went wrong",
      status_code: _error.status_code || status_code,
      data: {},
    } as T;
  }
}
