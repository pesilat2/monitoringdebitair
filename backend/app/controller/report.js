const asyncHandler = require('express-async-handler');
const moment = require('moment');
const { Report, Device } = require('../models');
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

const getReportByDate = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;
  const device = await Device.findOne({
    where: { id: deviceId },
  });

  if (!device) {
    return res.status(404).json({ message: 'Device not found' });
  }

  const reports = await Report.findAll({
    where: { deviceId },
    attributes: ['date'],
    order: [['date', 'ASC']],
  });

  const result = {
    deviceName: device.name,
    perhari: reports.reduce((acc, report) => {
      const dateKey = moment(report.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(report.date);
      return acc;
    }, {}),
    perminggu: reports.reduce((acc, report) => {
      const dateKey = moment(report.date).startOf('week').format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(report.date);
      return acc;
    }, {}),
    perbulan: reports.reduce((acc, report) => {
      const dateKey = moment(report.date).startOf('month').format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(report.date);
      return acc;
    }, {}),
  };

  return res.status(200).json({
    status: 'success',
    data: result,
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

module.exports = {
  createReportHandler,
  getAllReportHandler,
  getAllReportByDevice,
  getReportByDate,
  getReportByIdHandler,
  updateReportByIdHandler,
  deleteReportByIdHandler,
};
