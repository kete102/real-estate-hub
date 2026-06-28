import { z } from "zod";

export const SearchIntentSchema = z.object({
  location: z.string().optional(),

  price: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),

  size: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),

  bedrooms: z.number().nullable().optional(),
  bathrooms: z.number().optional(),

  operation: z.enum(["For_Sale", "For_Rent", "For_Share"]).optional(),

  terrace: z.boolean().optional(),
  pool: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
  garage: z.boolean().optional(),
  elevator: z.boolean().optional(),

  furnished: z.boolean().optional(),
  airConditioning: z.boolean().optional(),

  keywords: z.array(z.string()).optional(),
});
