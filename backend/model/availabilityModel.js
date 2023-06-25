import mongoose from "mongoose";

const availabilitySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    availabilityDate: {
      type: String,
      required: true,
    },
    availabilityTime: {
      type: String,
      required: true,
    },
    availabilityType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Availability = mongoose.model("Availability", availabilitySchema);

export default Availability;
