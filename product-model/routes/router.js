import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  getActiveProducts,
  getProductByPriceRange,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .post(createProduct)
  .get(getAllProducts)
  .delete(deleteAllProducts);

router.route("/active").get(getActiveProducts);

router.route("/price-range").get(getProductByPriceRange);

router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProductById);

export default router;
