const express = require("express");
const mailRouter = express.Router();
const controller = require("../controllers/email.controller");

mailRouter.post("/sendmail", controller.sendmail);
mailRouter.post("/forgotpassword", controller.resetmail);

module.exports = mailRouter;
