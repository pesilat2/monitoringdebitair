const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { User, Region } = require('../models');
const InvariantError = require('../exeptions/InvariantError');
const NotFoundError = require('../exeptions/NotFoundError');
const AuthorizationError = require('../exeptions/AuthorizationError');

const findUserByEmail = async (email) => User.findOne({
  where: {
    email,
  },
  attributes: {
    exclude: ['password'],
  },
});

const createUser = async ({
  fullname, email, password, regionId,
}) => {
  const id = `user-${nanoid()}`;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new InvariantError('Email sudah digunakan');
  }

  const user = {
    id,
    fullname,
    email,
    regionId,
    password: await bcrypt.hashSync(password, 10),

  };
  const newUser = await User.create(user);

  return newUser;
};

const findAllUser = async (userRole, regionId) => {
  if (userRole === 'ADMIN_UTAMA') {
    return User.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Region,
          attributes: ['name'],
        },
      ],
    });
  } if (userRole === 'ADMIN_DAERAH') {
    const usersInRegion = await User.findAll({
      where: {
        regionId,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Region,
          attributes: ['name'],
        },
      ],
    });
    return usersInRegion;
  }
  throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
};

const findUserById = async (userRole, userId, regionId) => {
  if (userRole === 'ADMIN_UTAMA') {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Region,
          attributes: ['name'],
        },
      ],
    });
    if (!user) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
    }
    return user;
  }
  if (userRole === 'ADMIN_DAERAH') {
    const user = await User.findOne({
      where: {
        id: userId,
        regionId,
      },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Region,
          attributes: ['name'],
        },
      ],
    });
    if (!user) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
    }
    return user;
  }
  throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
};

const updateUser = async (user, userRole, userId, regionId) => {
  if (userRole === 'ADMIN_UTAMA') {
    const existingUser = await User.findOne({ where: { id: userId } });
    if (!existingUser) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
    }
    await existingUser.update(user);
    return existingUser;
  }
  if (userRole === 'ADMIN_DAERAH') {
    const existingUser = await User.findOne({
      where: {
        id: userId,
        regionId,
      },
    });
    if (!existingUser) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan di daerah Anda`);
    }
    if (existingUser.role === 'ADMIN_UTAMA' || existingUser.role === 'ADMIN_DAERAH') {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
    await existingUser.update(user);
    return existingUser;
  }

  throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
};

const updateUserProfile = async (userId, userData) => {
  const existingUser = await User.findByPk(userId);
  console.log('sebelum di update', existingUser.toJSON());
  if (userData.fullname) {
    existingUser.fullname = userData.fullname;
  }
  if (userData.email) {
    existingUser.email = userData.email;
  }
  if (userData.imageProfile) {
    existingUser.imageProfile = userData.imageProfile;
  }
  if (userData.age) {
    existingUser.age = userData.age;
  }
  if (userData.isMarried !== undefined) {
    existingUser.isMarried = userData.isMarried;
  }
  if (userData.gender) {
    existingUser.gender = userData.gender;
  }
  await existingUser.save();
  console.log('setelah di update', existingUser.toJSON());
  return existingUser;
};

const deleteUserById = async (userId, userRole, regionId) => {
  if (userRole === 'ADMIN_UTAMA') {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
    }
    await user.destroy();
  } else if (userRole === 'ADMIN_DAERAH') {
    const user = await User.findOne({
      where: {
        id: userId,
        regionId,
      },
    });
    if (!user) {
      throw new NotFoundError(`User dengan id '${userId}' tidak ditemukan`);
    }
    await user.destroy();
  } else {
    throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
  }
};

module.exports = {
  createUser,
  findAllUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  updateUser,
  deleteUserById,
};
