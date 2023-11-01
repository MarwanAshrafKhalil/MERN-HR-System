import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.model.js";
import { errorHandler } from "../utils/error.js";

export function test(req, res) {
  res.json({
    message: "auth route working",
  });
}

export async function signup(req, res, next) {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newEmployee = new Employee({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully." });
  } catch (error) {
    next(error);
  }
}

export async function signin(req, res, next) {
  const { username, password } = req.body;
  try {
    const validEmployee = await Employee.findOne({ username });
    if (!validEmployee) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(
      password,
      validEmployee.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validEmployee._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...rest } = validEmployee._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, {
        expires: expiryDate,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
}
