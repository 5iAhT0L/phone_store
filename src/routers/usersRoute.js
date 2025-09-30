import express from "express";
import {
  getAllUsersHandler,
  getUsersByIdHandler,
  addUserHandler,
} from "../handlers/usersHandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
userRouter.post("/users", addUserHandler);

export default userRouter;
