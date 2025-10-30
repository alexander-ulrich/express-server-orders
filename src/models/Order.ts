import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  products: string[];
  totalProducts: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    products: {
      type: [Types.ObjectId],
      ref: "Product",
      default: [],
      required: true,
    },
    totalProducts: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0.0, required: true },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
