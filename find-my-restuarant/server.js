import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import router from "./routes/restaurantRoutes.js";

import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());

if (process.env_NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) =>
  res.json({ message: "Welcome to FindMyRestaurant" })
);

app.use("/api/v1/restaurant", router);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
