import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  signInUser
} from "../controllers/userController";
import { authToken } from "../middlewares/authToken";

const userRouter: Router = express.Router();

userRouter.route("/create").post(createUser);

userRouter.route("/login").post(signInUser);

userRouter
  .route("/:id")
  .get(authToken, getUser)
  .patch(authToken, updateUser)
  .delete(authToken, deleteUser);

export default userRouter;
