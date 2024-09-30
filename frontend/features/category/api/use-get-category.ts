// import { useQuery } from "@tanstack/react-query";
// import apiClient from "~/utils/axios";
// import { ICategoryResponse } from "./dto";

// export const useGetCategory = (id?: string) => {
//   const query = useQuery({
//     enabled: !!id,
//     queryKey: ["category", { id }],
//     queryFn: async () => {
//       const res = await apiClient.get<ICategoryResponse>("/api/v1/countries", {
//         params: { id },
//       });
//       // if (!res.ok) {
//       //   throw new Error("Failed to fetch category");
//       // }
//       return res.data;
//     },
//   });

//   return query;
// };
