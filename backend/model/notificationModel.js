import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    appointmentId: {
      type: String,
    },
    notificationMessage: {
      type: String,
      required: true,
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
