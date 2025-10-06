import express from "express"; // ✅ add this line first
import {
  getAllProductsHandler,
  getProductsByIdHandler,
  addProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../handlers/productHandler.js";

const productsRoute = express.Router();

productsRoute.get("/products", getAllProductsHandler);
productsRoute.get("/products/:id", getProductsByIdHandler);
productsRoute.post("/products", addProductHandler);
productsRoute.put("/products/:id", updateProductHandler);
productsRoute.delete("/products/:id", deleteProductHandler);

export default productsRoute;
