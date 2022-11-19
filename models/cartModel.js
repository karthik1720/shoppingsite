import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userid: {
      required: true,
      type: String,
    },
    item: [
      {
        id: {
          type: String,
          required: true,
        },
        count: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
