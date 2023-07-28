const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');
const {
  findAllUser, findUserById, findUserByEmail, updateUser, deleteUserById, updateUserProfile,
} = require('../service/userService');

exports.findAll = asyncHandler(async (req, res) => {
  const { role, regionId } = req.user;

  let users;
  if (role === 'ADMIN_UTAMA') {
    users = await findAllUser(role); // Jika admin adalah ADMIN_UTAMA, ambil semua pengguna
  } else if (role === 'ADMIN_DAERAH') {
    // Jika admin adalah ADMIN_DAERAH, ambil pengguna berdasarkan regionId admin
    users = await findAllUser(role, regionId);
  } else {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }

  res.status(200).json({
    status: 'success',
    message: role === 'ADMIN_UTAMA'
      ? 'Menampilkan seluruh user yang terdaftar.'
      : 'Menampilkan user yang terdaftar di daerah Anda.',
    data: users,
  });
});

exports.findById = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { role, regionId } = req.user;
  const user = await findUserById(role, userId, regionId);
  res.status(200).json({
    status: 'success',
    message: 'Menampilkan user berdasarkan id.',
    data: user,
  });
});

exports.findByEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await findUserByEmail(email);
  res.status(200).json({
    status: 'success',
    message: 'Menampilkan user berdasarkan email',
    data: user,
  });
});

exports.updateUserHandler = asyncHandler(async (req, res) => {
  const { fullname, email, role } = req.body;
  const { id: userId } = req.params;
  const { role: userRole, regionId } = req.user;

  const user = await findUserById(userRole, userId, regionId);
  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }
  if (fullname) {
    user.fullname = fullname;
  }
  if (email) {
    user.email = email;
  }
  if (role) {
    user.role = role;
  }
  user.save();
  await updateUser(user, userRole, userId, regionId);
  res.status(200).json({
    status: 'success',
    message: 'Update user berhasil.',
    data: user,
  });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUserProfileHandler = asyncHandler(async (req, res) => {
  const {
    fullname, email, imageProfile, age, isMarried, gender,
  } = req.body;

  // const ageAsInteger = parseInt(age, 10);

  const { id } = req.user;
  await updateUserProfile(id, {
    fullname, email, imageProfile, age, isMarried, gender,
  });
  res.status(200).json({
    status: 'success',
    message: 'update profil successfully',
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const { role: userRole, regionId } = req.user;
  await deleteUserById(userId, userRole, regionId);

  res.status(200).json({
    message: `Sucessfully deleted User with id = ${req.params.id}`,
  });
});
