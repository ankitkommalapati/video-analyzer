const path = require("path");

exports.getFilePath = (filename) => {
  return path.join(__dirname, "../../uploads/videos", filename);
};