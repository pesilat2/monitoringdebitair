const bcrypt = require('bcryptjs');
const db = require('../models');

const { User } = db;

exports.findAll = async (req, res) => {
  const getUser = await User.findAll();

  console.log('>> Berhasil mendapatkan data user');
  res.send({
    request_status: true,
    message: 'Menampilkan seluruh user yang terdaftar.',
    data: getUser,
  });
};

exports.updateUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: 'Nama belum di isi',
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: 'email belum di isi',
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: 'password belum di isi',
    });
    return;
  }
  const getUser = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  getUser.username = req.body.username;
  getUser.email = req.body.email;
  getUser.password = bcrypt.hashSync(req.body.password, 10);

  getUser.save();

  console.log('>> Berhasil mendapatkan data user');
  res.send({
    request_status: true,
    message: 'Menampilkan seluruh user yang terdaftar.',
    data: getUser,
  });
};

exports.deleteUser = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.send({
    message: `Sucessfully deleted User with id = ${req.params.id}`,
  });
};
