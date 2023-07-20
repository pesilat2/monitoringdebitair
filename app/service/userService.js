const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
// const NotFoundError = require('../exeptions/NotFoundError');
// const invariantError = require('../exeptions/InvariantError');
// const AuthorizationError = require('../exeptions/AuthorizationError');
const InvariantError = require('../exeptions/InvariantError');
const { User } = require('../models');

const findUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
});

const createUser = async ({ username, email, password }) => {
  const id = `user-${nanoid()}`;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new InvariantError('Email sudah digunakan');
  }

  const user = {
    id,
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  };

  const newUser = await User.create(user);

  return newUser;
};

module.exports = {
  createUser,
  findUserByEmail,
};
