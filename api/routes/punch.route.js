import express from "express";
import { punchIn, punchOut } from "../controllers/Punch.controller.js";

const router = express.Router();

// router.get("/", test);
router.post("/punchin", punchIn);
router.post("/punchout", punchOut);

export default router;
