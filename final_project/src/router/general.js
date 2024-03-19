const express = require("express");
const {
  getBookList,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getReview,
} = require("../services/bookService");
const { registerUser } = require("../services/userService");
//let isValid = require("./auth_users.js").isValid;
//let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", registerUser);

// Get the book list available in the shop
public_users.get("/", getBookList);

// Get book details based on ISBN
public_users.get("/isbn/:isbn", getBooksByISBN);

// Get book details based on author
public_users.get("/author/:author", getBooksByAuthor);

// Get all books based on title
public_users.get("/title/:title", getBooksByTitle);

//  Get book review
public_users.get("/review/:isbn", getReview);

module.exports.general = public_users;
