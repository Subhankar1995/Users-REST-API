import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  signInUser
} from "../controllers/userController";
import { authToken } from "../middlewares/authToken";

// This is the user route to handle all the action regarding user
const userRouter: Router = express.Router();

// create or sign up route
userRouter.route("/create").post(createUser);

// login user route
userRouter.route("/login").post(signInUser);

// user route for read, update and delete user
userRouter
  .route("/:id")
  .get(authToken, getUser)
  .patch(authToken, updateUser)
  .delete(authToken, deleteUser);

export default userRouter;
