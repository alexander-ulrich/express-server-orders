import { z } from "zod";

export const productInputSchema = z
  .object({
    name: z
      .string({ error: "Product name must be a string" })
      .min(5, { message: "Product name must be at least 5 characters long" })
      .trim(),
    description: z
      .string({ error: "Product name must be a string" })
      .trim()
      .optional(),
    amount: z.int({ error: "Product amount must be an integer" }),
    price: z.number({ error: "Product amount must be a number" }),
  })
  .strict();
