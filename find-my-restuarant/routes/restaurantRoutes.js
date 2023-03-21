import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantByCuisine,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.route("/").post(createRestaurant).get(getAllRestaurants);

router.route("/cuisine").get(getRestaurantByCuisine);

export default router;
