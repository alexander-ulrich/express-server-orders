import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);

productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
