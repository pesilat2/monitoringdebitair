/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary');

// config
cloudinary.config({
  cloud_name: 'hikio-17',
  api_key: '921939215128972',
  api_secret: 'GEj0BuvOoF9nLE468oSEhV7fIjw',
});

const upload = asyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });

  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

const remove = asyncHandler(async (req, res) => {
  const imageId = req.body.public_id;

  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send('ok');
  });
});

module.exports = {
  upload,
  remove,
};
