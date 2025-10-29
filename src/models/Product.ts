import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  amount: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: { type: String, trim: true, default: "no description" },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
