const express = require("express");
const router = express.Router();

const upload = require("../../middleware/upload.middleware");
const checkRole = require("../../middleware/rbac.middleware");
const videoController = require("./video.controller");

router.post(
  "/upload",
  upload.single("video"),
  checkRole("admin", "editor"),
  videoController.uploadVideo
);

module.exports = router;