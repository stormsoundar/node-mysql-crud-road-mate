import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '../loaders/config.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from './asyncHandler.js';
import connection from '../config/db.config.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];

  // Make sure token exists
  if (!token) return next(new ErrorResponse('Unauthorized', 401));

  // Verify token
  const decoded = jwt.verify(token, AUTH_TOKEN_SECRET);
  const query = `SELECT * FROM users WHERE id='${decoded.userData.id}'`;
  const [user] = await connection.query(query);
  if (!user) return next(new ErrorResponse('Unauthorized', 404));
  if (user.role !== 'admin') return next(new ErrorResponse('Forbidden', 403));
  req.user = user;
  next();
});
