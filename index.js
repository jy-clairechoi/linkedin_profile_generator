const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/users");
const path = require("path");

require("dotenv").config();

// creates express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
// allows us to parse json (bc we'll be sending and receiving json)
app.use(express.json());

//connect to the database
const uri = process.env.DB;
mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// helps handle CORS related issues that you might face
// when trying to access the api from different domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

// starts server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
