const express = require("express");
const app = express();
const helmet = require("helmet");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
app.use(cookieParser());

// Data Sanitization against XSS attacks
app.use(xss());
app.use(helmet());

//Body limit is 10kb
app.use(
  express.json({
    limit: "10kb",
  })
);

// Database connection
mongoose.connect(
  "mongodb://localhost:27017/Auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("successfully connected to database");
  }
);

//Set maximum amount of request for users
const limit = rateLimit({
  max: 3, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: JSON.stringify({
    msgBody: "Too many requests",
    msgError: true,
  }), // message to send
});

//Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", limit, authRouter);
const mailRouter = require("./routes/mailer.routes");
app.use("/mail", mailRouter);

//server
app.listen(7000, () => {
  console.log("express server started");
});
