const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middleware/authCheck');

const {
  findAll,
  findById, updateUserHandler, deleteUser, findByEmail, getUserProfile,
  updateUserProfileHandler,
} = require('../controller/user');

router.get('/me', authCheck, getUserProfile);
router.get('/users', authCheck, adminCheck, findAll);
router.get('/users/:id', authCheck, adminCheck, findById);
router.get('/users/:email', authCheck, adminCheck, findByEmail);
router.put('/me', authCheck, updateUserProfileHandler);
router.put('/users/:id', authCheck, adminCheck, updateUserHandler);
router.delete('/users/:id', authCheck, adminCheck, deleteUser);

module.exports = router;
