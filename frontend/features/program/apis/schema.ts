import { z } from "zod";

export const ProgramSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  note: z.string().optional(),
});
