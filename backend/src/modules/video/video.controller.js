const videoService = require("./video.service");
const { processVideo } = require("../../services/processing.service");
const { getIO } = require("../../config/socket");
const Video = require("./video.model");
const { streamVideo } = require("../../services/streaming.service");

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

exports.stream = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
  
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
  
      // 🔥 Multi-tenant protection
      if (video.organization.toString() !== req.user.organizationId) {
        return res.status(403).json({ error: "Forbidden" });
      }
  
      streamVideo(req, res, video.filepath);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };