const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middleware/authCheck');

const {
  findAll, findById, updateUserHandler, deleteUser, findByEmail, getUserProfile,
  updateUserProfileHandler,
} = require('../controller/user');

router.get('/findAll/users', authCheck, adminCheck, findAll);
router.get('/find/user/:id', authCheck, adminCheck, findById);
router.get('/find/email/:email', authCheck, adminCheck, findByEmail);
router.get('/me', authCheck, getUserProfile);
router.put('/update/me', authCheck, updateUserProfileHandler);
router.put('/update/user/:id', authCheck, adminCheck, updateUserHandler);
router.delete('/delete/user/:id', authCheck, adminCheck, deleteUser);

module.exports = router;
