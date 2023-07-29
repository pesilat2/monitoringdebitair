const express = require('express');
const {
  createReportHandler,
  getAllReportHandler,
  getReportByIdHandler,
  updateReportByIdHandler,
  // getReportByDate,
  getAllReportByDevice,
  getReportDeviceDay,
  getReportDeviceWeek,
  getReportDeviceMonth,
  deleteReportByIdHandler,
} = require('../controller/report');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/reports', getAllReportHandler);
router.get('/reports/:id', getReportByIdHandler);
router.get('/report/devices', getAllReportByDevice);
router.get('/report/day/:deviceId/:date', getReportDeviceDay);
router.get('/report/week/:deviceId/:date', getReportDeviceWeek);
router.get('/report/month/:deviceId/:date', getReportDeviceMonth);
// router.get('/report/devices', getReportByDate);
router.put('/reports/:id', authCheck, adminCheck, updateReportByIdHandler);
router.delete('/reports/:id', authCheck, adminCheck, deleteReportByIdHandler);
router.post('/reports', authCheck, adminCheck, createReportHandler);

module.exports = router;
