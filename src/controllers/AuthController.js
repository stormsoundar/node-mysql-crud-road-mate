import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { AUTH_TOKEN_EXPIRE, AUTH_TOKEN_SECRET } from '../loaders/config.js';

import connection from '../config/db.config.js';
import ErrorResponse from '../utils/errorResponse.js';
import httpStatus from '../constants/httpStatus.js';
import asyncHandler from '../middleware/asyncHandler.js';
const authController = {};

/**
 *  @desc   Create User
 *  @route  POST /api/v1/auth/registration
 *  @access Public
 */
authController.registration = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const isExistingUser = await connection.query(query);
  if (isExistingUser.length) {
    return next(new ErrorResponse('Mail Already Exists!', httpStatus.CONFLICT));
  }
  // Hash the password using bcrypt
  const hashPassword = await bcrypt.hash(password, 10);
  const q =
    'INSERT INTO users(`id`, `name`, `email`, `password`, `role`) VALUES (?)';
  const values = [uuidv4(), name, email, hashPassword, 'user'];
  const createUser = await connection.query(q, [values]);
  if (createUser.affectedRows)
    return res
      .status(httpStatus.OK)
      .send({ message: 'User created successfully' });
});

/**
 *  @desc   Login
 *  @route  POST /api/v1/auth/login
 *  @access Public
 */
authController.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email='${email}'`;
  const isExistingUser = await connection.query(query);
  if (!isExistingUser.length) {
    return next(
      new ErrorResponse(
        'User not found. Try with different one!',
        httpStatus.CONFLICT
      )
    );
  }
  const match = await bcrypt.compareSync(password, isExistingUser[0].password);
  if (!match) {
    return next(
      new ErrorResponse('Invalid credentials', httpStatus.BAD_REQUEST)
    );
  }
  const userData = isExistingUser[0];
  delete userData.password;
  // Create token
  const token = jwt.sign({ userData }, AUTH_TOKEN_SECRET, {
    expiresIn: AUTH_TOKEN_EXPIRE,
  });
  return res.status(httpStatus.OK).send({ success: true, token });
});

export default authController;
