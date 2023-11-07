import express from "express";
import {
  punchGet,
  punchIn,
  punchOut,
} from "../controllers/Punch.controller.js";

const router = express.Router();

// router.get("/", test);
router.post("/punchin", punchIn);
router.post("/punchout", punchOut);
router.post("/", punchGet);

export default router;
