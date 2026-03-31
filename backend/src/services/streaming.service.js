const fs = require("fs");

exports.streamVideo = (req, res, filePath) => {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  const chunkSize = end - start + 1;

  const file = fs.createReadStream(filePath, { start, end });

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4", // we can improve later
  };

  res.writeHead(206, headers);

  file.pipe(res);
};