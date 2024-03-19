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
  APP_SETTING_TOKEN: SETTING_TOKEN,
  SESSION_SETTING: SETTING_SESSION,
};
