const express = require('express');

const router = express.Router();
const { authCheck, adminCheck } = require('../middleware/authCheck');
const {
  createOrderHandler, getAllOrderHandler, getOrderByIdHandler, getUserOrder, deleteOrderByIdHandler,
} = require('../controller/order');

router.post('/order', authCheck, adminCheck, createOrderHandler);
router.get('/orders', authCheck, adminCheck, getAllOrderHandler);
router.get('/order/:id', authCheck, adminCheck, getOrderByIdHandler);
router.get('/me/order', authCheck, getUserOrder);
router.delete('/order/:id', authCheck, adminCheck, deleteOrderByIdHandler);

module.exports = router;
