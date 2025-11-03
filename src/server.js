import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routers/usersRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleWare.js";
import productRoute from "./routers/productRoute.js";

const app = express();
app.use(express.json());

const port = 3000;

// app.use("/", productRoute);
app.use("/", userRouter);

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
