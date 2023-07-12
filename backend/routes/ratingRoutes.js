import express from "express";
const router = express.Router();
import { addRating, getRatings } from "../controllers/ratingController.js";

router.post("/", addRating);
router.get("/", getRatings);

export default router;
