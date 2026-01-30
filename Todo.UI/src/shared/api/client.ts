import createClient from "openapi-fetch";
import type { paths } from "./schema";

export interface ApiError {
  title: string;
  status: number;
  errors: Record<string, string[]>;
  traceId: string;
}

export const api = createClient<paths>({
  baseUrl: "http://192.168.129.4:5268",
  fetch: async (request: Request) => {
    const res = await fetch(request);

    if (!res.ok) {
      let errorData: ApiError | null = null;
      try {
        errorData = await res.json();
      } catch {
        // If we can't parse JSON, use default error
      }

      if (errorData) { throw errorData; }
    
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    return res;
  },
});
