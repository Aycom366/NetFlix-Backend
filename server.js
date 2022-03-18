require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

//middlewares import
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

//routes import
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const listRoute = require("./routes/listRoute");

const NotFound = require("./middlewares/Notfound");
const ErrorHandler = require("./middlewares/ErrorHandler");

//middlewares
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(morgan("dev"));

//routes usage
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/list", listRoute);

app.use(NotFound);
app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));
