const asyncHandler = require('express-async-handler');
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
  getReportByIdHandler,
  updateReportByIdHandler,
  deleteReportByIdHandler,
};
