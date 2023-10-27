import express from "express";
import { test, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/", test);
router.post("/sign-up", signup);
// router.get("/sign-in", signin);

export default router;
