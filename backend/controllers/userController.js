import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../util/generateToken.js";

// @desc Auth User or Set Token
// @route POST /api/users
// @access Public
const getAdvisorUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ userType: "Advisor" })
    .select("-password")
    .lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Auth User or Set Token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.userType === "Leads" || user.userType === "Admin") {
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } else {
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
        expertise: user.expertise,
        education: user.education,
        company: user.company,
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  }
});

// @desc Add user
// @route POST /api/users
// @access Public
const addUser = asyncHandler(async (req, res) => {
  if (req.body.userType === "Leads") {
    const {
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

  if (req.body.userType === "Advisor") {
    const {
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
      expertise,
      education,
      company,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
      expertise,
      education,
      company,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
        expertise: user.expertise,
        education: user.education,
        company: user.company,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc Logout user
// @route POST /api/users
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc Get current user
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user.userType === "Advisor") {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      middleName: req.user.middleName,
      lastName: req.user.lastName,
      age: req.user.age,
      contactNumber: req.user.contactNumber,
      gender: req.user.gender,
      birthDate: req.user.birthDate,
      email: req.user.email,
      address: req.user.address,
      facebook: req.user.facebook,
      instagram: req.user.instagram,
      linkedIn: req.user.linkedIn,
      password: req.user.password,
      profilePicture: req.user.profilePicture,
      userType: req.user.userType,
      expertise: req.user.expertise,
      education: req.user.education,
      company: req.user.company,
    };
    res.status(200).json(user);
  } else {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      middleName: req.user.middleName,
      lastName: req.user.lastName,
      age: req.user.age,
      contactNumber: req.user.contactNumber,
      gender: req.user.gender,
      birthDate: req.user.birthDate,
      email: req.user.email,
      address: req.user.address,
      facebook: req.user.facebook,
      instagram: req.user.instagram,
      linkedIn: req.user.linkedIn,
      password: req.user.password,
      profilePicture: req.user.profilePicture,
      userType: req.user.userType,
    };
    res.status(200).json(user);
  }
});

// @desc Update current user
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (user) {
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      profilePicture: updatedUser.profilePicture,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  getAdvisorUsers,
  authUser,
  addUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
