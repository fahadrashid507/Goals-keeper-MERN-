const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;
const baseURL = process.env.BASE_URL;

const corsOptions = {
  origin: "https://goal-keeper-site.onrender.com",
  optionsSuccessStatus: 200,
};

connectDB();

const app = express();

//the following line helps us to parse json data
app.use(express.json());

//the following line allows us to parse urlencoded data
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use(`/api/goals`, require("./routes/goalRoutes"));

app.use(`/api/users`, require("./routes/userRoutes"));

/** Note - this will not work if it is written before the require statement
 *
 * sequence -
 *
 * 1. middle-ware
 * 2. router (require)
 * 3. errorHandler
 *
 * **/

//to override the default express error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
