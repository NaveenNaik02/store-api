import mongoose, { Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: Date;
  company?: "ikea" | "liddy" | "caressa" | "marcos" | null | undefined;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

export default mongoose.model<ProductDocument>("Product", productSchema);
