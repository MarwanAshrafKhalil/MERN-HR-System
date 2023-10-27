import express from "express";
import { test } from "../controllers/Employee.controller.js";
const router = express.Router();

router.get("/", test);
// router.post("/update/:id", verifyToken, updateEmployee);
// router.delete("/delete/:id", verifyToken, deleteEmployee);

export default router;
