import express from "express";
const router = express.Router();
import {
  addComplaint,
  getAllComplaint,
  getComplaintDetails,
} from "../controllers/complaintController.js";

router.route("/").get(getAllComplaint).post(addComplaint);
router.post("/details", getComplaintDetails);

export default router;
