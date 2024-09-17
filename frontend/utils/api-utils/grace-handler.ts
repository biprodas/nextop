import ApiError from "./api-error";
export type ErrorFunction<T extends (...args: any[]) => any> = (
  e: unknown,
  ...args: Parameters<T>
) => ReturnType<T>;

export const graceHandler =
  <T extends (...args: any[]) => any>(fetcher: T, onError?: ErrorFunction<T>) =>
  // @ts-expect-error for some reason ReturnType<T> is not aligning.
  async (...args: Parameters<T>): ReturnType<T> => {
    try {
      return await fetcher(...args);
    } catch (error) {
      return onError?.(error, ...args) as ReturnType<T>;
    }
  };

export const graceServerSideHandler =
  <T extends (...args: any[]) => any>(fetcher: T) =>
  // @ts-expect-error for some reason ReturnType<T> is not aligning.
  async (...args: Parameters<T>): ReturnType<T> => {
    try {
      const res = await fetcher(...args);
      // if (isResValid(res)) return res;
      throw new ApiError(res.message, res.status_code);
    } catch (error) {
      throw error;
    }
  };
