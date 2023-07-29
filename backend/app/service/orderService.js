const { nanoid } = require('nanoid');
const {
  Order, Device, User, Region,
} = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');

const createOrder = async ({
  userId, deviceId, quantity, totalPrice,
}) => {
  const id = `order-${nanoid()}`;
  const order = {
    id,
    userId,
    deviceId,
    quantity,
    totalPrice,
  };
  const newOrder = await Order.create(order);
  return newOrder;
};

const findAllOrder = async (userRole, regionId) => {
  if (userRole === 'ADMIN_UTAMA') {
    const orders = await Order.findAll({
      include: [
        {
          model: Device,
          attributes: ['name', 'max', 'price'],
          include: [
            {
              model: Region,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['fullname', 'email'],
        },
      ],
    });
    return orders;
  }
  if (userRole === 'ADMIN_DAERAH') {
    const device = await Device.findOne({ where: { regionId } });

    if (!device) {
      throw new NotFoundError('Perangkat tidak ditemukan');
    }

    const orders = await Order.findAll({
      where: { deviceId: device.id },
      include: [
        {
          model: Device,
          attributes: ['name', 'max', 'price'],
          include: [
            {
              model: Region,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['fullname', 'email'],
        },
      ],
    });
    if (!orders) {
      throw NotFoundError('transaksi tidak ditemukan');
    }

    return orders;
  }

  throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
};

const findOrderById = async (orderId) => {
  const order = await Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: Device,
        attributes: ['name', 'max', 'price'],
      },
    ],
  });
  if (!order) {
    throw new NotFoundError('transaksi tidak ditemukan');
  }
  return order;
};

const findOrderByUserId = async (userId) => {
  const order = await Order.findOne({
    where: { userId },
    include: [
      {
        model: Device,
        attributes: ['name', 'max', 'price'],
        include: [
          {
            model: Region,
            attributes: ['name'],
          },
        ],
      },
      {
        model: User,
        attributes: ['fullname', 'email'],
      },
    ],
  });
  if (!order) {
    throw new NotFoundError('transaksi tidak ditemukan');
  }
  return order;
};

const deleteOrderById = async (orderId) => {
  await Order.destroy({ where: { id: orderId } });
};
module.exports = {
  createOrder,
  findAllOrder,
  findOrderById,
  findOrderByUserId,
  deleteOrderById,
};
