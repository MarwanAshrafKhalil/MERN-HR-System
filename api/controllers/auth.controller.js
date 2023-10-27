import bcryptjs from "bcryptjs";
import Employee from "../models/Employee.model.js";

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
