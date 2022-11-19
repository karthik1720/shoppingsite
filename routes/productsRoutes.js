import express from "express";
import { checkToken } from "../utils/checkAuth.js";
import {
  getProducts,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  viewFeatured,
} from "../controllers/products.js";

export const router = express.Router();

router.get("/view", getProducts);
router.post("/add", addProduct);
router.get("/view/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
router.put("update/:id", updateProduct);
router.get("/featured", viewFeatured);
router.get("/check", checkToken);
