/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./app/models');
const authRoutes = require('./app/routes/auth');
const regionRoutes = require('./app/routes/region');
const userRoutes = require('./app/routes/user');
const deviceRoutes = require('./app/routes/device');
const reportRoutes = require('./app/routes/report');
const runSeeders = require('./seeders');
const { errorHandler } = require('./app/middleware/errorHandler');

const app = express();

require('dotenv').config();
/** MIDDLEWARE */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);
app.use('/', regionRoutes);
app.use('/', reportRoutes);
app.use('/', userRoutes);
app.use('/', deviceRoutes);

/** ENDPOINT SEEDERS */
app.use('/seeders', (req, res) => {
  runSeeders();

  res.status(200).json({
    status: 'success',
    message: 'Seeders run successfully.',
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
