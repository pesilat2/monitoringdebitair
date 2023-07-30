/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-mixed-operators */
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Report, Device, Order, User } = require('../models');
const {
  existingReport,
  createReport,
  findAllReport,
  availabilityReport,
  updateReportById,
  getOrdersByDeviceAndDay,
  getOrdersByDeviceAndWeek,
  getOrdersByDeviceAndMonth,
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

const getReportDeviceDay = asyncHandler(async (req, res) => {
  // eslint-disable-next-line radix
  const deviceId = parseInt(req.params.deviceId);
  const { date } = req.params;

  const reports = await getOrdersByDeviceAndDay(deviceId, date);
  res.status(200).json({
    status: 'success',
    data: reports,
  });
});

const getReportDeviceWeek = asyncHandler(async (req, res) => {
  // eslint-disable-next-line radix
  const deviceId = parseInt(req.params.deviceId);
  const { date } = req.params;

  const reports = await getOrdersByDeviceAndWeek(deviceId, date);
  res.status(200).json({
    status: 'success',
    data: reports,
  });
});

const getReportDeviceMonth = asyncHandler(async (req, res) => {
  const deviceId = parseInt(req.params.deviceId, 10);
  const { date } = req.params;

  const reports = await getOrdersByDeviceAndMonth(deviceId, date);
  res.status(200).json({
    status: 'success',
    data: reports,
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

    const totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    const numberOfOrders = orders.length;
    return {
      totalPrice, numberOfOrders,
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
  getReportDeviceDay,
  getReportDeviceWeek,
  getReportDeviceMonth,
  // getReportByDate,
  getReportByIdHandler,
  updateReportByIdHandler,
  deleteReportByIdHandler,
  reportFeedbackHandler,
};

// const getReportByDate = asyncHandler(async (req, res) => {
//   const { deviceId } = req.params;
//   const device = await Device.findOne({
//     where: { id: deviceId },
//   });

//   if (!device) {
//     return res.status(404).json({ message: 'Device not found' });
//   }

//   const reports = await Report.findAll({
//     where: { deviceId },
//     attributes: ['date'],
//     order: [['date', 'ASC']],
//   });

//   const result = {
//     deviceName: device.name,
//     perhari: reports.reduce((acc, report) => {
//       const dateKey = moment(report.date).format('YYYY-MM-DD');
//       if (!acc[dateKey]) {
//         acc[dateKey] = [];
//       }
//       acc[dateKey].push(report.date);
//       return acc;
//     }, {}),
//     perminggu: reports.reduce((acc, report) => {
//       const dateKey = moment(report.date).startOf('week').format('YYYY-MM-DD');
//       if (!acc[dateKey]) {
//         acc[dateKey] = [];
//       }
//       acc[dateKey].push(report.date);
//       return acc;
//     }, {}),
//     perbulan: reports.reduce((acc, report) => {
//       const dateKey = moment(report.date).startOf('month').format('YYYY-MM-DD');
//       if (!acc[dateKey]) {
//         acc[dateKey] = [];
//       }
//       acc[dateKey].push(report.date);
//       return acc;
//     }, {}),
//   };

//   return res.status(200).json({
//     status: 'success',
//     data: result,
//   });
// });
