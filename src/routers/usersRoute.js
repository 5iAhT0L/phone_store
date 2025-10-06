import express from "express";
import {
  getAllUsersHandler,
  getUsersByIdHandler,
  addUserHandler,
  updateUserHandler,
} from "../handlers/usersHandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
userRouter.post("/users", addUserHandler);
userRouter.put("/users/:id", updateUserHandler);

export default userRouter;
