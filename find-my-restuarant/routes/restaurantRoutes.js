import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantByCuisine,
  getKosherRestaurants,
  getRestaurantByCity,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.route("/").post(createRestaurant).get(getAllRestaurants);

router.route("/cuisine").get(getRestaurantByCuisine);

router.route("/kosher").get(getKosherRestaurants);

router.route("/city").get(getRestaurantByCity);

export default router;
