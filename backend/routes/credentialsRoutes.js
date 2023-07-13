import express from "express";
const router = express.Router();
import {
  addCredentials,
  getUserCredentials,
} from "../controllers/credentialsController.js";

router.post("/add-credentials", addCredentials);
router.post("/", getUserCredentials);

export default router;
