import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

// @desc Add product
// @route POST /api/product
// @access Public
const addProduct = asyncHandler(async (req, res) => {
  const {
    userId,
    productName,
    productDescription,
    productType,
    productStatus,
    advisorName,
    company,
    productUrl,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productType ||
    !productStatus ||
    !advisorName ||
    !company ||
    !productUrl
  ) {
    res.status(401).send({ errorMessage: "All fields are required!" });
  }

  const product = await Product.create({
    userId,
    productName,
    productDescription,
    productType,
    productStatus,
    advisorName,
    company,
    productUrl,
  });

  if (product) {
    res.status(200).send({ message: "Product successfully added!" });
  } else {
    res.status(401).send({ errorMessage: "Something went wrong!" });
  }
});

export { addProduct };
