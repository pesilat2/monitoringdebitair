require('dotenv').config();
const asyncHandler = require('express-async-handler');
const userSign = require('../service/authService');
const { createAccessToken } = require('../tokenize/TokenManager');
const { createUser } = require('../service/userService');

const signUp = asyncHandler(async (req, res) => {
  const { id } = await createUser(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      id,
    },
  });
});

const signIn = asyncHandler(async (req, res) => {
  const { email } = await userSign(req.body);
  const accessToken = await createAccessToken({ email });

  res.status(201).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

module.exports = {
  signUp,
  signIn,
};
