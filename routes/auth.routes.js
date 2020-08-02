const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const controller = require("../controllers/auth.controller");
const requireSignin = passport.authenticate("local", { session: false });
const requireUser = passport.authenticate("jwt", { session: false });
const middleware = require("../middlewares/verifySignIn");

authRouter.post("/register", controller.register);
authRouter.post(
  "/login",
  middleware.checkUserExistAndPassword,
  requireSignin,
  controller.login
);
authRouter.get("/logout", requireUser, controller.logout);
authRouter.get("/admin", requireUser, controller.admin);
authRouter.get("/authenticate", requireUser, controller.authenticate);
authRouter.get("/reset/:token", controller.resetPassword);
authRouter.put("/updatepassword", controller.updatePassword);

module.exports = authRouter;
