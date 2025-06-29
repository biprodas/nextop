import { z } from "zod";

export const CountrySchema = z.object({
  name: z.string().min(1, {
    message: "Country name is required",
  }),
  alpha2: z.string().optional(),
  alpha3: z.string().optional(),
  isoCode: z.string().optional(),
  phoneCode: z.string().optional(),
});
