import express from "express";
import {
  getAllUsersHandler,
  getUsersByIdHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../handlers/usersHandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
userRouter.post("/users", addUserHandler);
userRouter.put("/users/:id", updateUserHandler);
userRouter.delete("/users/:id", deleteUserHandler);

export default userRouter;
