const jwt = require('jsonwebtoken');
const session = require('express-session');

const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      // User is authenticated, allow them to proceed
      next();
    } else { 
        return res.status(401).send("Username or Password is incorrect!");   
    }
  };