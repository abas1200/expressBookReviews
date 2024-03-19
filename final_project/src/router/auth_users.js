const express = require("express");
const HttpStatus = require("../constants/httpStatus");
const { SETTING_TOKEN } = require("../configs/appSetting");
const jwt = require("jsonwebtoken");

const regd_users = express.Router();
const { authenticatedUser } = require("../services/userService");

//only registered users can login
regd_users.post("/login", (req, res) => {
  const user = authenticatedUser(req.body.username, req.body.password);

  if (!user) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "User Not Found!" });
  }

  let accessToken = jwt.sign(
    {
      data: user,
    },
    SETTING_TOKEN.secret,
    { expiresIn: SETTING_TOKEN.expiresIn }
  );

  req.session.authorization = {
    accessToken,
  };
  return res.status(HttpStatus.SUCCESS).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
