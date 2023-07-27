const express = require('express');
const {
  createReportHandler,
  getAllReportHandler,
  getReportByIdHandler,
  updateReportByIdHandler,
  deleteReportByIdHandler,
} = require('../controller/report');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/reports', getAllReportHandler);
router.get('/reports/:id', getReportByIdHandler);
router.put('/reports/:id', authCheck, adminCheck, updateReportByIdHandler);
router.delete('/reports/:id', authCheck, adminCheck, deleteReportByIdHandler);
router.post('/reports', authCheck, adminCheck, createReportHandler);

module.exports = router;
