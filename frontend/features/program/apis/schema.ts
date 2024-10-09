import { z } from "zod";

export const ProgramSchema = z.object({
  // name: z.string().min(1, {
  //   message: "Name is required",
  // }),
  degree: z.string().min(1, {
    message: "Name is required",
  }),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  universityId: z.string().min(1, {
    message: "University is required",
  }),
  departmentId: z.string().optional(),
  session: z.string().optional(), // Fall, Spring
  year: z.string().optional(),
  priority: z.string().optional(), // High, Midium, Low
  gre: z.string().optional(),
  ielts: z.string().optional(),
  toefl: z.string().optional(),
  duolingo: z.string().optional(),
  pte: z.string().optional(),
  priorityDate: z.string().optional(),
  endDate: z.string().optional(),
  note: z.string().optional(),
});
