import { Order } from "#models";
import type { orderInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import type z from "zod";

type orderInputDTO = z.infer<typeof orderInputSchema>;
type orderDTO = orderInputDTO;

export const getAllOrders: RequestHandler<
  unknown,
  orderDTO[],
  unknown
> = async (req, res) => {
  const orders = await Order.find();
  if (!orders.length) throw new Error("No Orders found", { cause: 404 });

  return res.json(orders);
};

export const createOrder: RequestHandler<
  unknown,
  orderDTO,
  orderInputDTO
> = async (req, res) => {
  const order = await Order.create<orderInputDTO>(req.body);

  return res.status(201).json(order);
};

export const getOrderById: RequestHandler<
  { id: string },
  orderDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) throw new Error("Order not found", { cause: 404 });
  return res.json(order);
};
export const deleteOrder: RequestHandler<
  { id: string },
  { message: string },
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error("Order not found", { cause: 404 });

  return res.json({
    message: `Order with ID: ${id} was deleted successfully!`,
  });
};
