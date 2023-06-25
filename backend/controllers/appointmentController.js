import asyncHandler from "express-async-handler";
import Availability from "../model/availabilityModel.js";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";

// @desc Add product
// @route POST /api/product
// @access Public

const getAllDetails = asyncHandler(async (req, res) => {
  const { productId, advisorId, leadsId } = req.body;

  const productDetails = await Product.find({ _id: productId });
  const availabilityDetails = await Availability.find({ userId: advisorId });
  const leadsDetails = await User.find({ _id: leadsId });
  const advisorDetails = await User.find({ _id: advisorId });

  res.send({
    productDetails: productDetails,
    availabilityDetails: availabilityDetails,
    leadsDetails: leadsDetails,
    advisorDetails: advisorDetails,
  });
});

const addAvailability = asyncHandler(async (req, res) => {
  const { userId, availabilityDate, availabilityTime } = req.body;

  const checkAvailability = await Availability.findOne({
    userId: userId,
    availabilityDate: availabilityDate,
    availabilityTime: availabilityTime,
  }); // e check niya if ang company is na exist or wala

  if (checkAvailability) {
    res.status(400);
    throw new Error("Availability data and time is already exist");
  } else {
    const availability = await Availability.create({
      userId,
      availabilityDate,
      availabilityTime,
    });

    if (availability) {
      res
        .status(200)
        .send({ message: "Availability has been added successfully!" });
    } else {
      res.status(401).send({ message: "Something went wrong!" });
    }
  }
});

const getAvailabilityByAdvisor = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const availabilityDetails = await Availability.find({ userId: userId });

  res.send(availabilityDetails);
});

export { addAvailability, getAvailabilityByAdvisor, getAllDetails };
