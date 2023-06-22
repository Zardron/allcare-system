import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

// @desc get product by advisor
// @route POST /api/product
const getAllProduct = asyncHandler(async (req, res) => {
  const allProduct = await Product.find();

  res.send(allProduct);
});

// @desc Add product
// @route POST /api/product
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

// @desc get product by advisor
// @route POST /api/product
const getProductByAdvisor = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const productDetails = await Product.find({ userId: userId });

  res.send(productDetails);
});

export { getAllProduct, addProduct, getProductByAdvisor };
