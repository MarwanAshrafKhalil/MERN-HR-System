import express from "express";
import { punchIn } from "../controllers/Punch.controller.js";

const router = express.Router();

// router.get("/", test);
router.post("/punchin", punchIn);

export default router;
