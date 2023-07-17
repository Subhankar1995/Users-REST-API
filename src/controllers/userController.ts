import { Request, Response } from "express";
import pool from "../db/UserDataBase";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  checkEmailAvailableQuery,
  createUserQuery,
  deleteUserQuery,
  getUserQuery,
  loginUserQuery,
  updateUserDetailsQuery,
} from "../db/queries";
import { User } from "../interfaces/userInterface";

const jwtSecretKey = process.env.jwtSecretKey || "hidden";

function validateRequestBody(request: Request, forLogin?: boolean) {
  const schema = Joi.object({
    name: forLogin ? Joi.string().optional() : Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(request.body);
  return error;
}

export const signInUser = async (req: Request, res: Response) => {
  // validate request body
  const error = validateRequestBody(req, true);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { email, password } = req.body;
    const result = await pool.query(loginUserQuery, [email]);
    if (result.rowCount > 0) {
      const userDetails: User = result.rows[0];
      if (!bcrypt.compareSync(password, userDetails.password)) {
        return res.status(401).json({ message: "Invalid password." });
      }
      const userId = userDetails.id;
      const token = jwt.sign({ id: userId }, jwtSecretKey, { expiresIn: "1h" });
      res.status(200).send({ id: userId, token });
    } else {
      return res.status(404).send("user not found");
    }
  } catch (error) {
    return res.status(503).send("internal server error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  // validate request body
  const error = validateRequestBody(req);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password } = req.body;

  // check if email id already exists
  try {
    const result = await pool.query(checkEmailAvailableQuery, [email]);
    if (result.rows[0].count > 0) {
      return res
        .status(409)
        .send(`user email id already exists, please try logging in...`);
    }
  } catch (error) {
    return res.status(503).send("internal server error");
  }

  // Generate new UUID for the user
  const id = uuidv4();
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create the new user object
  const newUser = { id, name, email, password: hashedPassword };
  await pool.query(createUserQuery, [id, name, email, hashedPassword]);

  res.status(201).json({ id, name, email });
};

export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(getUserQuery, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const userDetails: User = result.rows[0];
    return res.status(200).send({
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
    });
  } catch (error) {
    return res.status(503).send("internal server error");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  // validate request body
  const error = validateRequestBody(req);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, email, password } = req.body;
  const id = req.params.id;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const updatedResult = await pool.query(updateUserDetailsQuery, [
      id,
      name,
      email,
      hashedPassword,
    ]);
    if (updatedResult.rowCount === 0) {
      return res.status(404).send("user not found!!");
    }
    const updatedUser: User = updatedResult.rows[0];

    res.send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    return res.status(503).send("internal server error");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(deleteUserQuery, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.send("deleted user");
  } catch (error) {
    return res.status(503).send("internal server error");
  }
};