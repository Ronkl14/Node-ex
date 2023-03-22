import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  getActiveProducts,
  getProductByPriceRange,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);

router.route("/active").get(getActiveProducts);

router.route("/price-range").get(getProductByPriceRange);

router.route("/:id").get(getProduct);

export default router;
