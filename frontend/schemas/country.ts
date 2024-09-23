import { z } from "zod";

export const CountrySchema = z.object({
  name: z.string().min(1, {
    message: "Country name is required",
  }),
  code: z.string().optional(),
  alpha2: z.string().optional(),
  alpha3: z.string().optional(),
  phone: z.string().optional(),
  capital: z.string().optional(),
  flag: z.string().optional(),
});
