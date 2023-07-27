/* eslint-disable camelcase */
const db = require('../models');

const { User, Order, Device } = db;

exports.createOrder = async (req, res) => {
  if (!req.body.deviceId) {
    res.status(400).json({
      request_status: false,
      message: 'Isi deviceId terlebih dahulu',
    });
    return;
  }
  if (!req.body.amount_of_water) {
    res.status(400).json({
      request_status: false,
      message: 'Isi jumlah air yang ingin dibeli terlebih dahulu',
    });
    return;
  }
  // eslint-disable-next-line no-undef
  const cost = amount_of_water * Device.price;

  const inputOrder = {
    order_date: new Date(),
    deviceId: req.body.deviceId,
    userId: req.body.User,
    total_cost: cost,
  };

  await Order.create(inputOrder);

  console.log('>> Berhasil membuat order');

  res.json({
    request_status: true,
    message: 'Pembelian berhasil. Jangan lupa order lagi ya!',
    data: {
      order_date: inputOrder.order_date,
      deviceId: inputOrder.deviceId,
      userId: inputOrder.userId,
      total_cost: inputOrder.total_cost,
    },
  });
};
