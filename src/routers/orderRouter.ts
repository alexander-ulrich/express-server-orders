import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", createOrder);

orderRouter.get("/:id", getOrderById);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
