const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  deleteUser,
  updateUser,
  getUserDetails,
} = require('../controller/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// login logout register
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

// forgot password

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

// update password
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// update, get, delete user

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// admins

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
