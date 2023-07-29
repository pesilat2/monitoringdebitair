const { nanoid } = require('nanoid');
const { Op } = require('sequelize');
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
    throw new InvariantError(`Report untuk device dengan id '${deviceId}' sudah ada.`);
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

// Controller function to get orders by device ID and created date in day
async function getOrdersByDeviceAndDay(deviceId, date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const reports = await Report.findAll({
    where: {
      deviceId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return reports;
}

// Controller function to get orders by device ID and created date in week
async function getOrdersByDeviceAndWeek(deviceId, date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 7);

  const reports = await Report.findAll({
    where: {
      deviceId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return reports;
}

// Controller function to get orders by device ID and created date in month
async function getOrdersByDeviceAndMonth(deviceId, date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setMonth(endDate.getMonth() + 1);

  const reports = await Report.findAll({
    where: {
      deviceId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return reports;
}

const deleteReportById = async (reportId) => {
  await Report.destroy({ where: { id: reportId } });
};

module.exports = {
  createReport,
  findAllReport,
  findReportById,
  updateReportById,
  getOrdersByDeviceAndDay,
  getOrdersByDeviceAndWeek,
  getOrdersByDeviceAndMonth,
  deleteReportById,
  availabilityReport,
  existingReport,
};
