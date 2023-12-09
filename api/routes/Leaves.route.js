import express from "express";
import {
  applyLeave,
  approveLeave,
  deleteLeave,
  getLeave,
} from "../controllers/Leaves.controller.js";

const router = express.Router();

router.post("/apply", applyLeave);
router.post("/delete", deleteLeave);
router.post("/approve", approveLeave);
router.post("/get", getLeave);
export default router;
