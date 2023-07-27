const express = require('express');
const {
  createRegionHandler,
  getAllRegionsHandler,
  getRegionByIdHandler,
  deleteRegionByIdHandler,
  updateRegionByIdHandler,
} = require('../controller/region');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.get('/regions', getAllRegionsHandler);
router.get('/regions/:id', getRegionByIdHandler);
router.post('/regions', authCheck, createRegionHandler);
router.put('/regions/:id', authCheck, adminCheck, updateRegionByIdHandler);
router.delete('/regions/:id', authCheck, adminCheck, deleteRegionByIdHandler);

module.exports = router;
