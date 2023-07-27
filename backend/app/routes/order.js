const express = require('express');
const {
  createOrder,
} = require('../controller/order');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.post('/order', authCheck, adminCheck, createOrder);

module.exports = router;
