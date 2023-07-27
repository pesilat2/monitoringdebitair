const { nanoid } = require('nanoid');
const { Report } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');

const createReport = async ({
  date, waterOut, deviceId,
}) => {
  const id = `report-${nanoid()}`;

  const report = {
    id, date, waterOut, deviceId,
  };

  const newReport = await Report.create(report);

  return newReport;
};

const existingReport = async (deviceId) => {
  const report = await Report.findOne({ where: { deviceId } });

  if (report) {
    throw new InvariantError(`Report untuk region dengan id '${deviceId}' sudah ada.`);
  }

  return true;
};

const findAllReport = async () => {
  const reports = await Report.findAll();

  return reports;
};

const availabilityReport = async (reportId) => {
  const report = await Report.findOne({ where: { id: reportId } });

  if (!report) {
    throw new NotFoundError(`Report dengan id '${reportId}' tidak ditemukan`);
  }

  return true;
};

const updateReportById = async (reportId, {
  date = '', waterOut = null, deviceId = '',
}) => {
  const report = await Report.findOne({ where: { id: reportId } });

  report.set({
    date: date || report.date,
    waterOut: waterOut || report.waterOut,
    deviceId: deviceId || report.deviceId,
  });

  await report.save();
};

const findReportById = async (reportId) => {
  const report = await Report.findOne({ where: { id: reportId } });

  return report;
};

const deleteReportById = async (reportId) => {
  await Report.destroy({ where: { id: reportId } });
};

module.exports = {
  createReport,
  findAllReport,
  findReportById,
  updateReportById,
  deleteReportById,
  availabilityReport,
  existingReport,
};
