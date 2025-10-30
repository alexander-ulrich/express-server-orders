import { Order } from "#models";
import type { IOrder } from "#models/Order";
import type { RequestHandler } from "express";

export const getAllOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find();
  if (!orders.length) throw new Error("No Orders found", { cause: 404 });

  return res.json(orders);
};
export const createOrder: RequestHandler = async (req, res) => {
  const { products, totalProducts, totalPrice } = req.body as IOrder;
  if (!products || !totalProducts || !totalPrice)
    throw new Error(
      "Orders require list of products, total amount of products and price total.",
      {
        cause: 400,
      }
    );
  const order = await Order.create({ products, totalProducts, totalPrice });

  return res
    .status(201)
    .json({ message: "Order created successfully!", order: order });
};

export const getOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) throw new Error("Order not found", { cause: 404 });
  return res.json(order);
};
export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error("Order not found", { cause: 404 });

  return res.json({
    message: `Order with ID: ${id} was deleted successfully!`,
  });
};
