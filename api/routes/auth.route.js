import express from "express";
import { test, signup, signin } from "../controllers/auth.controller.js";

const router = express.Router();
router.get("/", test);
router.post("/signup", signup);
router.post("/signin", signin);

// router.get("/sign-in", signin);

export default router;
