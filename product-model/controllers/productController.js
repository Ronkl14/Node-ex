import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    data: product,
  });
});
