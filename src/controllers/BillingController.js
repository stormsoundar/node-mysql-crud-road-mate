import httpStatus from '../constants/httpStatus.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';
import connection from '../config/db.config.js';

const billingController = {};

/**
 *  @desc   Create Bill
 *  @route  POST /api/v1/billing/create
 *  @access Private
 */
billingController.createBilling = asyncHandler(async (req, res, next) => {
  const {
    eway_bill_no,
    delivery_date,
    customer_name,
    phone,
    address,
    delivery_address,
    transaction_mode,
    is_igst,
    items,
    note,
    vehicle_no,
    delivery_charge,
    total_taxable_amount,
    discount,
    gst_amount,
    outstanding_amount,
    payment_mode,
    amount,
    is_hold,
    is_return,
    round_off,
    grand_total,
  } = req.body;

  const q =
    'INSERT INTO billing(`eway_bill_no`, `delivery_date`, `customer_name`, `phone`, `address`, `delivery_address`, `transaction_mode`, `is_igst`, `items`, `note`, `vehicle_no`, `delivery_charge`, `total_taxable_amount`, `discount`, `gst_amount`, `outstanding_amount`, `payment_mode`, `amount`, `is_hold`, `is_return`, `round_off`, `grand_total`) VALUES (?)';

  const values = [
    eway_bill_no,
    delivery_date,
    customer_name,
    phone,
    address,
    delivery_address,
    transaction_mode,
    is_igst,
    items,
    note,
    vehicle_no,
    delivery_charge,
    total_taxable_amount,
    discount,
    gst_amount,
    outstanding_amount,
    payment_mode,
    amount,
    is_hold,
    is_return,
    round_off,
    grand_total,
  ];

  const createBilling = await connection.query(q, [values]);

  if (createBilling.affectedRows)
    return res
      .status(httpStatus.OK)
      .send({ message: 'Bill created successfully' });
});

/**
 *  @desc   List Bills
 *  @route  GET /api/v1/billing/list
 *  @access Private
 */
billingController.listBills = asyncHandler(async (req, res, next) => {
  let query = 'SELECT * FROM billing';

  const listBills = await connection.query(query);

  return res.status(httpStatus.OK).send({ success: true, data: listBills });
});

/**
 *  @desc   Get Bill
 *  @route  GET /api/v1/billing/:id
 *  @access Private
 */
billingController.getBill = asyncHandler(async (req, res, next) => {
  let query = 'SELECT * FROM billing WHERE id LIKE "%' + req.params.id + '%"';

  const [bill] = await connection.query(query);

  if (!bill)
    return next(new ErrorResponse('Bill not found', httpStatus.NOT_FOUND));

  return res.status(httpStatus.OK).send({ success: true, data: bill });
});

/**
 *  @desc   Update Bill
 *  @route  PATCH /api/v1/billing/:id
 *  @access Private
 */
billingController.updateBill = asyncHandler(async (req, res, next) => {
  const {
    eway_bill_no,
    delivery_date,
    customer_name,
    phone,
    address,
    delivery_address,
    transaction_mode,
    is_igst,
    items,
    note,
    vehicle_no,
    delivery_charge,
    total_taxable_amount,
    discount,
    gst_amount,
    outstanding_amount,
    payment_mode,
    amount,
    is_hold,
    is_return,
    round_off,
    grand_total,
  } = req.body;

  const q =
    'UPDATE billing SET `eway_bill_no` = ?, `delivery_date` = ?, `customer_name` = ?, `phone` = ?, `address` = ?, `delivery_address` = ?, `transaction_mode` = ?, `is_igst` = ?, `items` = ?, `note` = ?, `vehicle_no` = ?, `delivery_charge` = ?, `total_taxable_amount` = ?, `discount` = ?, `gst_amount` = ?, `outstanding_amount` = ?, `payment_mode` = ?, `amount` = ?, `is_hold` = ?, `is_return` = ?, `round_off` = ?, `grand_total` = ? WHERE id = ?';

  const values = [
    eway_bill_no,
    delivery_date,
    customer_name,
    phone,
    address,
    delivery_address,
    transaction_mode,
    is_igst,
    items,
    note,
    vehicle_no,
    delivery_charge,
    total_taxable_amount,
    discount,
    gst_amount,
    outstanding_amount,
    payment_mode,
    amount,
    is_hold,
    is_return,
    round_off,
    grand_total,
  ];

  const updateBill = await connection.query(q, [...values, req.params.id]);

  if (!updateBill.affectedRows)
    return next(new ErrorResponse('Bill not found', httpStatus.NOT_FOUND));

  return res
    .status(httpStatus.OK)
    .send({ success: true, message: 'Bill updated successfully' });
});

/**
 *  @desc   Delete Bill
 *  @route  DELETE /api/v1/billing/:id
 *  @access Private
 */
billingController.deleteBill = asyncHandler(async (req, res, next) => {
  const query = `DELETE FROM billing WHERE id = "${req.params.id}"`;

  const deletedBill = await connection.query(query);

  if (deletedBill.affectedRows === 0)
    return next(new ErrorResponse('Bill not found', httpStatus.NOT_FOUND));
  return res
    .status(httpStatus.OK)
    .send({ success: true, message: 'Bill deleted successfully' });
});

export default billingController;
