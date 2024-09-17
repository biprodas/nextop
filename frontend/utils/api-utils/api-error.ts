export default class ApiError extends Error {
  constructor(message: string, public status_code: number) {
    super(message);
  }
}
