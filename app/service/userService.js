/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const { User } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
// const NotFoundError = require('../exeptions/NotFoundError');
// const AuthorizationError = require('../exeptions/AuthorizationError');

const signUp = async ({ username, email, password }) => {
  const id = `user-${nanoid()}`;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new InvariantError('Email sudah digunakan');
  }

  const user = {
    id,
    username,
    email,
    password,

  };
  const newUser = await User.create(user);

  return newUser;
};

module.exports = {
  signUp,
};
