import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "#controllers";
import { validateBodyZod } from "#middlewares";
import { orderInputSchema } from "#schemas";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", validateBodyZod(orderInputSchema), createOrder);

orderRouter.get("/:id", getOrderById);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
