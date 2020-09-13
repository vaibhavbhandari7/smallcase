require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// express app config
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb://localhost:27017/smallcase_trading'

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
const routes = require("./routes/");
app.use("/api", routes);

// starting server
mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => app.listen(PORT, () => console.log("server started on ", PORT)))
  .catch(err => console.log(err));
