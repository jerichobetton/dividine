const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const billRoutes = require("./routes/billRoutes");

app.use(bodyParser.json());

const v1Router = express.Router();
v1Router.use("/bill", billRoutes);
v1Router.use("/user", userRoutes);
app.use("/api/v1", v1Router);

// Ensure database connection before starting the server
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

// Handle MongoDB connection error
db.on("error", console.error.bind(console, "MongoDB connection error:"));
