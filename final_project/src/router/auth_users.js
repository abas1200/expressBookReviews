const express = require("express");
const HttpStatus = require("../constants/httpStatus");
const APP_SETTING_TOKEN = require("../configs/appSetting");
const jwt = require("jsonwebtoken");
let books = require("../stores/booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const user = req.body.user;

  if (!user) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: "User Not Found!" });
  }

  let accessToken = jwt.sign(
    {
      data: user,
    },
    APP_SETTING_TOKEN.secret,
    { expiresIn: APP_SETTING_TOKEN.expiresIn }
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
module.exports.isValid = isValid;
module.exports.users = users;
