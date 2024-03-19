const userStore = require("../stores/usersdb.js");
const HttpStatus = require("../constants/httpStatus");

const isUserNameExist = (username) =>
  userStore.filter((u) => u.username == username).length > 0;

const authenticatedUser = (username, password) =>
  userStore.filter((u) => u.username == username && u.password === password)
    .length > 0;

const registerUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isUserNameExist(username)) {
      userStore.push({ username: username, password: password });
      return res.json({
        message: "User successfully registred. Now you can login",
      });
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "User already exists!" });
    }
  }
  return res
    .status(HttpStatus.BAD_REQUEST)
    .json({ message: "Unable to register user." });
};

module.exports = {
  registerUser,
};
