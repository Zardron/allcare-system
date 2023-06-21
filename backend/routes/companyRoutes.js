import express from "express";
const router = express.Router();
import { addCompany, getCompany } from "../controllers/companyController.js";

router.post("/", addCompany);
router.get("/", getCompany);

export default router;
