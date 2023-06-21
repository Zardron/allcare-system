import express from "express";
const router = express.Router();
import {
  authUser,
  addUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAdvisorUsers,
  getLeads,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/advisor-list", getAdvisorUsers);
router.get("/leads-list", getLeads);
router.post("/", addUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(updateUserProfile);

export default router;
