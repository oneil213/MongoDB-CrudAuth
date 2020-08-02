require("dotenv").config();
module.exports = {
  USER: process.env.EMAIL_ADDRESS,
  PASS: process.env.EMAIL_PASSWORD,
};
