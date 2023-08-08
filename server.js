// importing required libraries
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

// connect to databse
connectDB();
// creating express server or express app
const app = express();

// following inbuilt middleware is used to get req body passed by client
app.use(express.json());

// defining route
app.get("/api/test", (req, res) => {
  res.send("testing");
});

// defining routes using middleware
// app.use() tells Express to use the specified middleware for all requests that start with the specified path.
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// following middleware is used for error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
