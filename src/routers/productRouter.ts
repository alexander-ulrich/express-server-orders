import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "#controllers";
import { validateBodyZod } from "#middlewares";
import { productInputSchema } from "#schemas";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", validateBodyZod(productInputSchema), createProduct);

productRouter.get("/:id", getProductById);
productRouter.put("/:id", validateBodyZod(productInputSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
