const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateWebToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};



module.exports = { generateHashedPassword, generateWebToken};