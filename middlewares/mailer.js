const nodemailer = require("nodemailer");
const email = require("../config/email.config");

const transport = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: email.USER,
    pass: email.PASS,
  },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

exports.mailer = {
  transporter: transporter,
};
