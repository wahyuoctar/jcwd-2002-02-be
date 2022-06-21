const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign(payload, KEY, {
    expiresIn: "1d",
  });
  return token;
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, KEY);

  return isVerified;
};

module.exports = {
  generateToken,
  verifyToken,
};
