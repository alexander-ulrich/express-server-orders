import { Product } from "#models";
import type { IProduct } from "#models/Product";
import type { RequestHandler } from "express";

export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await Product.find();
  if (!Product.length) throw new Error("No Products found", { cause: 404 });

  return res.json(products);
};
export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, amount, price } = req.body as IProduct;
  if (!name || !amount || !price)
    throw new Error("Product name, amount and price are required.", {
      cause: 400,
    });
  const product = await Product.create({ name, description, amount, price });

  return res
    .status(201)
    .json({ message: "Product created successfully!", product: product });
};

export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) throw new Error("Product not found", { cause: 404 });
  return res.json(product);
};
export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, amount, price } = req.body as IProduct;
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found", { cause: 404 });

  product.name = name;
  product.description = description;
  product.amount = amount;
  product.price = price;

  const updatedProduct = await product.save();
  return res.json({
    message: "Product updated successfully!",
    oldProduct: product,
    newProduct: updatedProduct,
  });
};
export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found", { cause: 404 });

  return res.json({
    message: `Product with ID: ${id} was deleted successfully!`,
  });
};
