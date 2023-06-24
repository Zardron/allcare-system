import express from "express";
const router = express.Router();
import {
  addCompany,
  getCompany,
  updateUser,
} from "../controllers/companyController.js";

router.post("/", addCompany);
router.put("/", updateUser);
router.post("/get-company", getCompany);

export default router;
