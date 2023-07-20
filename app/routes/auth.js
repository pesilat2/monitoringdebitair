const express = require('express');

const router = express.Router();
const { signUp, signIn } = require('../controller/auth');

router.post('/auth/signup', signUp);
router.post('/auth/signin', signIn);

// // Route untuk menangani permintaan reset password
// routes.post('/forgot-password', (req, res) => {
//   const { email } = req.body;

//   // Proses pengiriman email reset password
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: '',
//       pass: '',
//     },
//   });

//   const mailOptions = {
//     from: '',
//     to: email,
//     subject: 'Reset Password',
//     text: 'Anda menerima email ini karena Anda (atau seseorang) telah meminta reset password. '
//         + 'Klik link berikut untuk mereset password Anda: http://localhost:5000/reset-password',
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.send('Terjadi kesalahan saat mengirim email');
//     } else {
//       console.log(`Email terkirim: ${info.response}`);
//       res.send('Email reset password telah terkirim');
//     }
//   });
// });

// // Route untuk menangani permintaan reset password
// routes.post('/reset-password', (req, res) => {
//   const { password } = req.body;

//   // Lakukan pembaruan password di database Anda
//   // ...

//   res.send('Password berhasil direset');
// });

// routes.post('/auth/register', (req, res) => {
//   try {
//     authContoller.signUp(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// routes.post('/auth/login', (req, res) => {
//   try {
//     authContoller.signIn(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// routes.get('/auth', (req, res) => {
//   try {
//     // tokenController.verifyToken(req, res, userController.findAll);
//     userController.findAll(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// routes.put('/auth/:id', (req, res) => {
//   try {
//     tokenController.verifyToken(req, res, userController.updateUser);
//     // userController.updateUser(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

// routes.delete('/auth/:id', (req, res) => {
//   try {
//     tokenController.verifyToken(req, res, userController.deleteUser);
//     // userController.deleteUser(req, res);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
