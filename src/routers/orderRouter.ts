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

//Valid Routes
orderRouter.get("/", getAllOrders);
orderRouter.post("/", validateBodyZod(orderInputSchema), createOrder);

orderRouter.get("/:id", getOrderById);
orderRouter.delete("/:id", deleteOrder);

//Method not allowed
orderRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.delete("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

orderRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.put("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default orderRouter;
