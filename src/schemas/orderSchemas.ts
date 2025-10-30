import z from "zod";

export const orderInputSchema = z
  .object({
    products: z.array(
      z
        .string({
          error: "ProductList must be array of ProductIDs (strings)",
        })
        .trim()
    ),

    totalProducts: z.int({ error: "Product total amount must be an integer" }),
    totalPrice: z.number({ error: "Price total must be a number" }),
  })
  .strict();
