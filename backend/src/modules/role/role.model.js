const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: [String], // e.g. ["upload_video", "view_video"]
});

module.exports = mongoose.model("Role", roleSchema);