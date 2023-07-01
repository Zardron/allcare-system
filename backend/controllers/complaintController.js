import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import Complaint from "../model/complaintModel.js";

// @desc get product by advisor
// @route POST /api/product
const getAllComplaint = asyncHandler(async (req, res) => {
  const allComplaint = await Complaint.find();

  res.send(allComplaint);
});

const addComplaint = asyncHandler(async (req, res) => {
  const {
    userId,
    complainantName,
    subject,
    type,
    complaintId,
    complaintName,
    description,
  } = req.body;

  const checkComplaint = await Complaint.findOne({
    userId: userId,
    complainantName: complainantName,
    subject: subject,
    type: type,
    complaintId: complaintId,
    complaintName: complaintName,
    description: description,
  });

  if (checkComplaint) {
    res
      .status(401)
      .send({ message: "You already submitted a complaint with same details" });
  } else {
    const complaint = await Complaint.create({
      userId,
      complainantName,
      subject,
      type,
      complaintId,
      complaintName,
      description,
    });

    if (complaint) {
      res.status(200).send({ message: "Complaint submitted successfully" });
    }
  }
});

export { getAllComplaint, addComplaint };
