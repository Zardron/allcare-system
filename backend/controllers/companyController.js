import asyncHandler from "express-async-handler";
import Company from "../model/companyModel.js";

// @desc Add product
// @route POST /api/product
// @access Public
const addCompany = asyncHandler(async (req, res) => {
  const { userId, companyName } = req.body;

  const checkCompany = await Company.findOne({ companyName });

  if (checkCompany) {
    res.status(400);
    throw new Error("Company already exist");
  }

  if (!companyName) {
    res.status(401).send({ message: "Company name is required!" });
  }

  const company = await Company.create({
    userId,
    companyName,
  });

  if (company) {
    res
      .status(200)
      .send({ message: "New company has been added successfully!" });
  } else {
    res.status(401).send({ message: "Something went wrong!" });
  }
});

const getCompany = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const companyInfo = await Company.find({ userId: userId });

  if (companyInfo) {
    res.status(200).send(companyInfo);
  } else {
    res.status(401).send({ errorMessage: "Something went wrong!" });
  }
});

export { addCompany, getCompany };
