const { nanoid } = require('nanoid');
const { Region } = require('../models');
const NotFoundError = require('../exeptions/NotFoundError');

const createRegion = async ({ name }) => {
  const id = `region-${nanoid()}`;
  const region = await Region.create({ id, name });

  return region;
};

const findAllRegions = async () => {
  const regions = await Region.findAll();

  return regions;
};

const findRegionById = async (regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  if (!region) {
    throw new NotFoundError('Region tidak ditemukan');
  }

  return region;
};

const deleteRegionById = async (regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  if (!region) {
    throw new NotFoundError('Region tidak ditemukan');
  }

  await region.destroy();
};

const updateRegionById = async (name, regionId) => {
  const region = await Region.findOne({ where: { id: regionId } });

  if (!region) {
    throw new NotFoundError('Region tidak ditemukan');
  }

  await region.update({
    name,
  });

  return region;
};

module.exports = {
  createRegion,
  findAllRegions,
  findRegionById,
  deleteRegionById,
  updateRegionById,
};
