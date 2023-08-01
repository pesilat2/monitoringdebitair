const asyncHandler = require('express-async-handler');
const { signIn } = require('../service/authService');
const { createAccessToken } = require('../tokenize/TokenManager');
const { createUser } = require('../service/userService');

const userSignUp = asyncHandler(async (req, res) => {
  const { id, regionId, region } = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      id,
      regionId,
      regionName: region,
    },
  });
});

const userSignIn = asyncHandler(async (req, res) => {
  const { id: userId } = await signIn(req.body);
  const accessToken = await createAccessToken(userId);

  res.status(201).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

module.exports = {
  userSignIn,
  userSignUp,
};
