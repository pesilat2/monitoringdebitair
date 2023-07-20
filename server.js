/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./app/models');
const authRoutes = require('./app/routes/auth');

const app = express();

require('dotenv').config();
/** MIDDLEWARE */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);

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
