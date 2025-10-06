import express from "express";
import { testConnection } from "./config/db.js";
import productRoute from "./routers/productRoute.js";

const app = express();

app.use(express.json());

const port = 3000;

app.use("/", productRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
