const User = require("../models/User");
const config = require("../config/auth.config");
const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Adeola",
      sub: userID,
    },
    config.secret,
    { expiresIn: "1h" }
  );
};

exports.register = (req, res) => {
  const { username, password, role, email } = req.body;
  User.findOne(
    {
      username,
    },
    (err, user) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error has occurred",
            msgError: true,
          },
        });
      if (user)
        res.status(400).json({
          message: {
            msgBody: "Username is already taken",
            msgError: true,
          },
        });
      else {
        const newUser = new User({
          password,
          username,
          role,
          email,
        });
        newUser.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Error has occurred",
                msgError: true,
              },
            });
          else
            res.status(201).json({
              message: {
                msgBody: "Account successfully created",
                msgError: false,
              },
            });
        });
      }
    }
  );
};

exports.login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).json({
        isAuthenticated: true,
        user: {
          username,
          role,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: {
        msgBody: "Error has occurred",
        msgError: true,
      },
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({
    user: {
      username: "",
      role: "",
    },
    success: true,
  });
};

exports.admin = (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({
      message: {
        msgBody: "You are an admin",
        msgError: false,
      },
    });
  } else
    res.status(403).json({
      message: {
        msgBody: "You're not an admin,go away",
        msgError: true,
      },
    });
};

exports.authenticate = (req, res) => {
  const { username, role, email } = req.user;
  res.status(200).json({
    isAuthenticated: true,
    user: {
      username,
      role,
      email,
    },
  });
};

exports.resetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  }).then((user) => {
    if (user === null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).json({
        message: {
          msgBody: "password reset link is invalid or has expired",
          msgError: true,
        },
      });
    } else {
      res.status(200).send({
        username: user.username,
        resetPasswordToken: user.resetPasswordToken,
        message: {
          msgBody: "Please enter a new password",
          msgError: false,
        },
      });
    }
  });
};

exports.updatePassword = (req, res) => {
  User.findOne({
    username: req.body.username,
    resetPasswordToken: req.body.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  }).then((user) => {
    if (!user) {
      console.error("password reset link is invalid or has expired");
      res.status(403).json({
        message: {
          msgBody: "password reset link is invalid or has expired",
          msgError: true,
        },
      });
    } else {
      console.log("user exists in db");
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save((err) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occurred",
              msgError: true,
            },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "password updated",
              msgError: false,
            },
          });
      });
    }
  });
};
