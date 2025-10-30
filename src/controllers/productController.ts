import { Product } from "#models";
import type { productInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import type z from "zod";

type productInputDTO = z.infer<typeof productInputSchema>;
type productDTO = productInputDTO;

export const getAllProducts: RequestHandler<
  unknown,
  productDTO[],
  unknown
> = async (req, res) => {
  const products = await Product.find();
  if (!products.length) throw new Error("No Products found", { cause: 404 });

  return res.json(products);
};
export const createProduct: RequestHandler<
  unknown,
  productDTO,
  productInputDTO
> = async (req, res) => {
  const product = await Product.create<productInputDTO>(req.body);

  return res.status(201).json(product);
};

export const getProductById: RequestHandler<
  { id: string },
  productDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found", { cause: 404 });
  return res.json(product);
};
export const updateProduct: RequestHandler<
  { id: string },
  productDTO,
  productInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { name, description, amount, price } = req.body as productDTO;
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found", { cause: 404 });

  product.name = name;
  product.description = description;
  product.amount = amount;
  product.price = price;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
};
export const deleteProduct: RequestHandler<
  { id: string },
  { message: string },
  unknown
> = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found", { cause: 404 });

  return res.json({
    message: `Product with ID: ${id} was deleted successfully!`,
  });
};
