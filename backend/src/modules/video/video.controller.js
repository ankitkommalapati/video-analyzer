const videoService = require("./video.service");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const video = await videoService.createVideo({
      file: req.file,
      user: req.user,
    });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};