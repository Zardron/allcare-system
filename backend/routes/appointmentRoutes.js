import express from "express";
const router = express.Router();
import {
  addAvailability,
  getAllDetails,
  getAvailabilityByAdvisor,
} from "../controllers/appointmentController.js";

router.post("/availability", addAvailability);
router.post("/my-availability", getAvailabilityByAdvisor);
router.post("/get-details", getAllDetails);

export default router;
