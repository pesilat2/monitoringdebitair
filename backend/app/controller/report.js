const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const {
  Report, Device, Order, User,
} = require('../models');
const {
  existingReport,
  createReport,
  findAllReport,
  availabilityReport,
  updateReportById,
  findReportById,
  deleteReportById,
} = require('../service/reportService');

const createReportHandler = asyncHandler(async (req, res) => {
  const {
    date, deviceId, waterOut,
  } = req.body;
  await existingReport(deviceId);
  const { id: reportId } = await createReport({
    date, deviceId, waterOut,
  });

  res.status(201).json({
    status: 'success',
    data: {
      reportId,
    },
  });
});

const getAllReportHandler = asyncHandler(async (req, res) => {
  const reports = await findAllReport();

  res.status(200).json({
    status: 'success',
    data: {
      reports,
    },
  });
});

const getReportByIdHandler = asyncHandler(async (req, res) => {
  const { id: reportId } = req.params;

  await availabilityReport(reportId);

  const report = await findReportById(reportId);

  res.status(200).json({
    status: 'success',
    data: {
      report,
    },
  });
});

const updateReportByIdHandler = asyncHandler(async (req, res) => {
  const { id: reportId } = req.params;

  await availabilityReport(reportId);
  await updateReportById(reportId, req.body);

  res.status(200).json({
    status: 'success',
    message: `Update report with id '${reportId}' successfully`,
  });
});

const getAllReportByDevice = asyncHandler(async (req, res) => {
  const devices = await Device.findAll({
    include: [{
      model: Report,
      attributes: ['deviceId', 'date'],
    }],
  });

  res.status(200).json({
    status: 'success',
    data: devices,
  });
});

const deleteReportByIdHandler = asyncHandler(async (req, res) => {
  const { id: reportId } = req.params;

  await availabilityReport(reportId);
  await deleteReportById(reportId);

  res.status(200).json({
    status: 'success',
    message: `Delete report with id '${reportId}' successfully`,
  });
});

const reportFeedbackHandler = asyncHandler(async (req, res) => {
  const today = new Date();

  today.setUTCHours(23, 59, 59, 999);

  // calculate Days
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysAgo.setUTCHours(0, 0, 0, 0);

  // calculate weeks
  const sevenWeeksAgo = new Date(today);
  const dayOfWeek = sevenWeeksAgo.getUTCDay();
  const dayToSubstract = (dayOfWeek + 7) % 7 + 1;
  // weeks
  sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - dayToSubstract);

  // get data year ago
  const twelveMonthsAgo = new Date(today);
  twelveMonthsAgo.setUTCMonth(today.getUTCMonth() - 11);

  const dailyStatistics = [];
  const weeklyStatistics = [];
  const monthlyStatistics = [];

  // calculate usage water
  const calculateOrderStatistics = (order) => {
    let orders = order;

    if (req.user.role === 'ADMIN_DAERAH') {
      orders = order.filter((item) => item.User.regionId === req.user.regionId);
    }

    if (req.user.role === 'USER') {
      orders = order.filter((item) => item.User.id === req.user.id);
    }

    const quantity = orders.reduce((acc, order) => acc + order.quantity, 0);
    const numberOfOrders = orders.length;
    return {
      quantity, numberOfOrders,
    };
  };

  // function get data usage water with range date
  const getOrderData = async (startDate, endDate) => {
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: {
        model: User,
        attributes: ['regionId', 'id'],
      },
    });

    return orders;
  };

  // get statistics daily
  for (let i = 0; i < 7; i++) {
    const startDate = new Date(today);
    const endDate = new Date(today);

    startDate.setDate(today.getDate() - i);
    startDate.setUTCHours(0, 0, 0, 0);

    endDate.setDate(today.getDate() - i + 1);
    endDate.setUTCHours(0, 0, 0, 0);

    const dailyOrders = await getOrderData(startDate, endDate);

    const dailyStats = calculateOrderStatistics(dailyOrders);

    dailyStatistics.push({
      date: startDate.toISOString().slice(0, 10),
      ...dailyStats,
    });
  }

  // get weeks statistics
  for (let i = 0; i < 7; i++) {
    const startDate = new Date(sevenWeeksAgo);
    const endDate = new Date(sevenWeeksAgo);

    startDate.setDate(sevenWeeksAgo.getDate() + i * 7);
    startDate.setUTCHours(0, 0, 0, 0);

    endDate.setDate(sevenWeeksAgo.getDate() + (i + 1) * 7);
    endDate.setUTCHours(0, 0, 0, 0);

    const weeklyOrders = await getOrderData(startDate, endDate);

    const weeklyStats = calculateOrderStatistics(weeklyOrders);

    const start = new Date(startDate.toISOString().slice(0, 10));
    start.setDate(start.getDate() - 7);

    const end = new Date(endDate.toISOString().slice(0, 10));
    end.setDate(end.getDate() - 7);

    weeklyStatistics.push({
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      ...weeklyStats,
    });
  }

  // get monthly statistics
  for (let i = 0; i < 12; i++) {
    const startDate = new Date(twelveMonthsAgo);

    startDate.setUTCMonth(twelveMonthsAgo.getUTCMonth() + i);
    startDate.setUTCDate(1);

    const endDate = new Date(startDate);
    endDate.setUTCMonth(startDate.getUTCMonth() + 1);
    endDate.setDate(0);

    const monthlyOrders = await getOrderData(startDate, endDate);

    const monthlyStats = calculateOrderStatistics(monthlyOrders);

    monthlyStatistics.push({
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      ...monthlyStats,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      dailyStatistics,
      weeklyStatistics,
      monthlyStatistics,
    },
  });
});

module.exports = {
  createReportHandler,
  getAllReportHandler,
  getAllReportByDevice,
  reportFeedbackHandler,
  getReportByIdHandler,
  updateReportByIdHandler,
  deleteReportByIdHandler,
  reportFeedbackHandler,
};
