const express = require('express');
const {
  createReportHandler,
  getAllReportHandler,
  getReportByIdHandler,
  updateReportByIdHandler,
  reportFeedbackHandler,
  getAllReportByDevice,
  deleteReportByIdHandler,
} = require('../controller/report');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/report-feedback', authCheck, reportFeedbackHandler);
router.get('/reports', getAllReportHandler);
router.get('/reports/:id', getReportByIdHandler);
router.get('/report/:devicesId', getAllReportByDevice);
router.put('/reports/:id', authCheck, adminCheck, updateReportByIdHandler);
router.delete('/reports/:id', authCheck, adminCheck, deleteReportByIdHandler);
router.post('/report', authCheck, adminCheck, createReportHandler);

module.exports = router;
