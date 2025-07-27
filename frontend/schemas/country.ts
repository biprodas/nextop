import { z } from "zod";

export const CountrySchema = z.object({
  name: z.string().min(1, {
    message: "Country name is required",
  }),
  alpha2Code: z.string().optional(),
  alpha3Code: z.string().optional(),
  numericCode: z.string().optional(),
  callingCode: z.string().optional(),
});
