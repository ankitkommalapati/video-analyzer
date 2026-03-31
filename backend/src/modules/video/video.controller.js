const videoService = require("./video.service");
const { processVideo } = require("../../services/processing.service");
const { getIO } = require("../../config/socket");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const video = await videoService.createVideo({
      file: req.file,
      user: req.user,
    });

    const io = getIO();

    // 🔥 async processing (non-blocking)
    processVideo(video._id, io);

    res.json(video);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};