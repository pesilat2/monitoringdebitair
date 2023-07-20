const bcrypt = require('bcryptjs');
const { User } = require('../models');
const AuthenticationError = require('../exeptions/AuthenticationError');

const userSign = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  console.log(user.username);

  if (!user) {
    throw new AuthenticationError('Kredensial tidak valid. User tidak ditemukan');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError('Kredensial yang anda masukkan tidak valid');
  }

  return user;
};

module.exports = userSign;
