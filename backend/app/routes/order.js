const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middleware/authCheck');
const {
  createOrderHandler, getAllOrderHandler, getOrderByIdHandler, deleteOrderByIdHandler,
} = require('../controller/order');

router.post('/order', authCheck, adminCheck, createOrderHandler);
router.get('/orders', authCheck, adminCheck, getAllOrderHandler);
router.get('/order/:id', authCheck, adminCheck, getOrderByIdHandler);
router.delete('/order/:id', authCheck, adminCheck, deleteOrderByIdHandler);

module.exports = router;
