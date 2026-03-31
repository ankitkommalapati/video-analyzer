const Video = require("../modules/video/video.model");

exports.processVideo = async (videoId, io) => {
  try {
    // mark as processing
    await Video.findByIdAndUpdate(videoId, {
      status: "processing",
    });

    const steps = [20, 50, 80, 100];

    for (let progress of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      io.emit("video-processing", {
        videoId,
        progress,
      });
    }

    const sensitivity = Math.random() > 0.7 ? "flagged" : "safe";

    await Video.findByIdAndUpdate(videoId, {
      status: "processed",
      sensitivity,
    });

    io.emit("video-completed", {
      videoId,
      sensitivity,
    });

  } catch (err) {
    console.error("Processing error:", err);
  }
};