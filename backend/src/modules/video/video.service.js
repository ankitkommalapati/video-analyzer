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