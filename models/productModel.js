import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
      },
      count: {
        type: Number,
      },
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
