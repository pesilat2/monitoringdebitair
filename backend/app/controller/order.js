const asyncHandler = require('express-async-handler');
const NotFoundError = require('../exeptions/NotFoundError');
const {
  createOrder, findAllOrder, findOrderById, findOrderByUserId, deleteOrderById,
} = require('../service/orderService');
const { Device } = require('../models');
const AuthorizationError = require('../exeptions/AuthorizationError');
const ClientError = require('../exeptions/ClientError');

const createOrderHandler = asyncHandler(async (req, res) => {
  const { userId, deviceId, quantity } = req.body;
  const {
    id: adminId, role, regionId,
  } = req.user;

  const device = await Device.findByPk(deviceId);
  if (!device) {
    throw new NotFoundError('Perangkat tidak ditemukan');
  }
  if (role === 'ADMIN_DAERAH' && device.regionId !== regionId) {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }
  if (quantity > device.max) {
    throw new ClientError('Jumlah order melebihi ketersediaan air');
  }

  const totalPrice = quantity * device.price;
  const { id: orderId } = await createOrder({
    adminId, userId, deviceId, quantity, totalPrice,
  });
  device.max -= quantity;
  await device.save();
  res.status(201).json({
    status: 'success',
    message: `successfully ordered by admin id ${adminId}`,
    data: {
      orderId,
      userId,
      deviceId,
      deviceName: device.name,
      quantity,
      totalPrice,
    },
  });
});

const getAllOrderHandler = asyncHandler(async (req, res) => {
  const { role, regionId } = req.user;

  const order = await findAllOrder(role, regionId);
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

const getOrderByIdHandler = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  const order = await findOrderById(orderId);

  res.status(200).json({
    status: 'success',
    data: order,
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  const { user } = req;
  const userOrder = await findOrderByUserId(user.id);
  res.status(200).json({
    status: 'success',
    data: userOrder,
  });
});

const deleteOrderByIdHandler = asyncHandler(async (req, res) => {
  const { id: orderId } = req.params;
  await deleteOrderById(orderId);

  res.status(200).json({
    status: 'success',
    message: `Successfuly deleted order with id ${orderId}`,
  });
});

module.exports = {
  createOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  getUserOrder,
  deleteOrderByIdHandler,
};
