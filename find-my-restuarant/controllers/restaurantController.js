import asyncHandler from "../middleware/asyncHandler.js";
import Restaurant from "../model/Restaurant.js";

//@desc Create new restaurant
//@route POST /api/v1/restaurants
//@access Private
export const createRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

//@desc Get all restaurants
//@route GET /api/v1/restaurants
//@access Public
export const getAllRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.find();
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

export const getRestaurantByCuisine = asyncHandler(async (req, res, next) => {
  const cuisine = req.query.cuisine;
  const restaurant = await Restaurant.find({ cuisine: { $in: [cuisine] } });
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

export const getKosherRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.find({ kosher: true });
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

export const getRestaurantByCity = asyncHandler(async (req, res, next) => {
  const city = req.query.city;
  const restaurant = await Restaurant.find({ "address.city": { $in: [city] } });
  res.status(200).json({
    success: true,
    data: restaurant,
  });
});
