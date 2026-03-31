const Video = require("./video.model");

exports.createVideo = async ({ file, user }) => {
  const video = await Video.create({
    title: file.originalname,
    filename: file.filename,
    filepath: file.path,
    uploadedBy: user.userId,
    organization: user.organizationId,
  });

  return video;
};

exports.getVideos = async ({ user, query }) => {
    const filter = {
      organization: user.organizationId,
    };
  
    // optional filters
    if (query.status) {
      filter.status = query.status;
    }
  
    if (query.sensitivity) {
      filter.sensitivity = query.sensitivity;
    }
  
    const videos = await Video.find(filter)
      .sort({ createdAt: -1 });
  
    return videos;
  };