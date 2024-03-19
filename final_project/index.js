const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./src/router/auth_users.js").authenticated;
const genl_routes = require("./src/router/general.js").general;

const HttpStatus = require("./src/constants/httpStatus.js");
const {
  SETTING_SESSION,
  SETTING_TOKEN,
} = require("./src/configs/appSetting.js");

const app = express();

app.use(express.json());

app.use("/customer", session(SETTING_SESSION));

app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    token = req.session.authorization["accessToken"];
    jwt.verify(token, SETTING_TOKEN.secret, (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: "User not authenticated" });
      }
    });
  } else {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ message: "User not logged in" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
