import express from 'express';
import billingController from '../../controllers/BillingController.js';
import { validation } from '../../middleware/validation.js';
import billingValidation from '../../validations/billingValidation.js';
import { protect } from '../../middleware/auth.js';

const router = express.Router();

router.post(
  '/create',
  validation(billingValidation.billingCreateSchema),
  protect,
  billingController.createBilling
);
router.get('/list', protect, billingController.listBills);
router.get('/:id', protect, billingController.getBill);
router.patch('/:id', protect, billingController.updateBill);
router.delete('/:id', protect, billingController.deleteBill);

export default router;
