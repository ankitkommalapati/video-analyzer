const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;