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

function groupByPeriod(reports, period) {
  const groupedReports = {};
  reports.forEach((report) => {
    const dateKey = moment(report.date).startOf(period).format('YYYY-MM-DD');
    if (!groupedReports[dateKey]) {
      groupedReports[dateKey] = [];
    }
    groupedReports[dateKey].push(report.date);
  });
  return groupedReports;
}

const getReportByDate = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;
  const device = await Device.findOne(deviceId);

  if (!device) {
    return res.status(404).json({ message: 'Device not found' });
  }

  const reports = await Report.findAll({
    where: { deviceId },
    attributes: ['date'],
    // order: [['date', 'ASC']],
  });

  const result = {
    deviceName: device.name,
    perhari: groupByPeriod(reports, 'day'),
    perminggu: groupByPeriod(reports, 'week'),
    perbulan: groupByPeriod(reports, 'month'),
  };

  return result;
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
