const asyncHandler = require('express-async-handler');
const { createRegion, findAllRegions, findRegionById, deleteRegionById, updateRegionById } = require('../service/regionService');

const createRegionHandler = asyncHandler(async (req, res) => {
 const { id: regionId } = await createRegion(req.body);

 res.status(201).json({
  status: 'success',
  data: {
   regionId,
  },
 });
});

const getAllRegionsHandler = asyncHandler(async (req, res) => {
 const regions = await findAllRegions();

 res.status(200).json({
  status: 'success',
  data: {
   regions,
  },
 });
});

const getRegionByIdHandler = asyncHandler(async (req, res) => {
 const { id: regionId } = req.params;
 const region = await findRegionById(regionId);

 res.status(200).json({
  status: 'success',
  data: {
   region,
  },
 });
});

const updateRegionByIdHandler = asyncHandler(async (req, res) => {
 const { id: regionId } = req.params;

 const { id } = await updateRegionById(req.body.name, regionId);

 res.status(200).json({
  status: 'success',
  message: `Update region with id '${id}' successfully`,
 });
});

const deleteRegionByIdHandler = asyncHandler(async (req, res) => {
 const { id: regionId } = req.params;
 await deleteRegionById(regionId);

 res.status(200).json({
  status: 'success',
  message: `Delete Region with id '${regionId}' successfully`,
 });
});

module.exports = {
 createRegionHandler,
 getAllRegionsHandler,
 getRegionByIdHandler,
 updateRegionByIdHandler,
 deleteRegionByIdHandler,
};
