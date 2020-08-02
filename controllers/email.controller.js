const { mailer } = require("../middlewares/mailer");
const crypto = require("crypto");
const User = require("../models/User");

exports.sendmail = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const content = `firstname: ${firstname} \n lastname: ${lastname} \n email: ${email} \n message: ${message}`;
  const mailOptions = {
    from: firstname,
    to: "info@yourdomain.com",
    subject: "New Message from Website",
    text: content,
  };
  mailer.transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: {
          msgBody: "failed",
          msgError: true,
        },
      });
    } else {
      console.log("here is the res: ", response);
      res.status(200).json({
        message: {
          msgBody: "Message sent",
          msgError: false,
        },
      });
      mailer.transporter.sendMail(
        {
          from: "info@yourdomain.com",
          to: email,
          Subject: "Message from Yourwebsite",
          text: ` Thank you for contacting us! \n\nForm details\nfirstname: ${firstname}\nlastname: ${lastname} \n Email: ${email}\n Message: ${message}`,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        }
      );
    }
  });
};

exports.resetmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error has occurred",
            msgError: true,
          },
        });
      if (!user)
        res.status(400).json({
          message: {
            msgBody: " Email not found please register",
            msgError: true,
          },
        });
      else {
        const token = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save();

        const mailOptions = {
          from: "annie31@ethereal.email",
          to: `${user.email}`,
          subject: "Link To Reset Password",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
            `http://localhost:3000/reset/${token}\n\n` +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };

        mailer.transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error("there was an error: ", err);
            res.status(500).json({
              message: {
                msgBody: "Error has occured",
                msgError: true,
              },
            });
          } else {
            console.log("here is the res: ", response);
            res.status(200).json({
              message: {
                msgBody: "Recovery mail sent. Check your mail box.",
                msgError: false,
              },
            });
          }
        });
      }
    }
  );
};
