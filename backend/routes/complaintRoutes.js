import express from "express";
const router = express.Router();
import {
  addComplaint,
  getAllComplaint,
} from "../controllers/complaintController.js";

router.route("/").get(getAllComplaint).post(addComplaint);

export default router;
