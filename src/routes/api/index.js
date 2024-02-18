import express from 'express';
import billingRoutes from './billingRoutes.js';
import authRoutes from './authRoutes.js';

const apiRoutes = express.Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/billing', billingRoutes);

export default apiRoutes;
