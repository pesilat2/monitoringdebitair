const express = require('express');
const { userSignIn, userSignUp } = require('../controller/auth');
const { validateUserRegister } = require('../validator/signUpValidator');
const { validateUserLogin } = require('../validator/signInValidator');

const router = express.Router();

router.post('/signup', validateUserRegister, userSignUp);
router.post('/auth/signin', validateUserLogin, userSignIn);

module.exports = router;
