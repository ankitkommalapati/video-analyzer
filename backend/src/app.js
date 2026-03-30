const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;