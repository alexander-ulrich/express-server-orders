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

//Valid Routes
productRouter.get("/", getAllProducts);
productRouter.post("/", validateBodyZod(productInputSchema), createProduct);

productRouter.get("/:id", getProductById);
productRouter.put("/:id", validateBodyZod(productInputSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

//Method not allowed
productRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
productRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

productRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
productRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default productRouter;
