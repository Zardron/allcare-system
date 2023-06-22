import express from "express";
const router = express.Router();
import {
  addProduct,
  getAllProduct,
  getProductByAdvisor,
} from "../controllers/productController.js";

router.route("/").get(getAllProduct).post(addProduct);
router.get("/advisor-product", getProductByAdvisor);

export default router;
