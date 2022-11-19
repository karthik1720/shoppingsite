import express from "express";

import {
  addItems,
  viewItems,
  deleteItems,
} from "../controllers/userController.js";
import { checkToken } from "../utils/checkAuth.js";

export const router = express.Router();

router.put("/cart/addItems", checkToken, addItems);
router.post("/cart/viewItems", checkToken, viewItems);
router.put("/cart/deleteItems/:id", checkToken, deleteItems);
