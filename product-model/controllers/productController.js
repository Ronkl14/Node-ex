import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getActiveProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({ isActive: true });
  res.status(200).json({
    success: true,
    data: product,
  });
});

export const getProductByPriceRange = asyncHandler(async (req, res, next) => {
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const product = await Product.find({
    "details.price": { $gte: minPrice, $lte: maxPrice },
  });
  res.status(200).json({
    success: true,
    data: product,
  });
});
