const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.checkUserExistAndPassword = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    username: username,
  }).then((user) => {
    if (!user) {
      res.status(401).json({
        message: {
          msgBody: "Please Register",
          msgError: true,
        },
      });
      return;
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(400).json({
        message: {
          msgBody: "Wrong password!",
          msgError: true,
        },
      });
      return;
    }
    next();
  });
};
