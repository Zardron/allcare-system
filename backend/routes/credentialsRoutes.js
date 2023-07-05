import express from "express";
const router = express.Router();
import {
  addCredentials,
  getUserCredentials,
} from "../controllers/credentialsController.js";

router.route("/").get(getUserCredentials).post(addCredentials);

export default router;
