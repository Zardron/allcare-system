import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    profilePicture: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    // additional fields for Advisor
    expertise: {
      type: String,
    },
    education: {
      type: String,
    },
    company: {
      type: String,
    },
    rating: {
      type: String,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
