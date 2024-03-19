const SETTING_TOKEN = {
  secret: "accessSecret",
  expiresIn: 3600,
};

const SETTING_SESSION = {
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true,
};

module.exports = {
  SETTING_TOKEN: SETTING_TOKEN,
  SETTING_SESSION: SETTING_SESSION,
};
