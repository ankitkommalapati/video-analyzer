const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    filename: String,
    filepath: String,

    status: {
      type: String,
      enum: ["uploaded", "processing", "processed"],
      default: "uploaded",
    },

    sensitivity: {
      type: String,
      enum: ["pending", "safe", "flagged"],
      default: "pending",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);