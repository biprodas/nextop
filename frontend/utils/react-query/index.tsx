"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

const queryClientOptions = {
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000 }, // cache time: 5 minutes
  },
};

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: { refetchOnWindowFocus: false, retry: 3 },
//     mutations: { retry: 3 },
//   },
// });

const ReactQueryPvorider: React.FC<PropsWithChildren> = ({ children }) => {
  // Create a query client instance
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryPvorider;
