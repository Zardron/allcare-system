import express from "express";
const router = express.Router();
import { addRating } from "../controllers/ratingController.js";

router.post("/", addRating);

export default router;
