import Joi from 'joi';

const billingValidation = {};
billingValidation.billingCreateSchema = Joi.object().keys({
  eway_bill_no: Joi.string().required().min(3).max(50),
  delivery_date: Joi.date(),
  customer_name: Joi.string().required().min(3).max(50),
  phone: Joi.string().required().min(3).max(50),
  address: Joi.string().required().min(3).max(150),
  delivery_address: Joi.string().required().min(3).max(150),
  transaction_mode: Joi.string()
    .required()
    .valid('cash', 'debit_card', 'credit_card', 'upi'),
  is_igst: Joi.boolean(),
  items: Joi.array().items({
    code: Joi.string().required(),
    item: Joi.string().required(),
    batch_code: Joi.string().required(),
    quantity: Joi.number().required(),
    unit_price: Joi.number().required(),
    mrp: Joi.number().required(),
    tax_value: Joi.number().required(),
    gst: Joi.number().required(),
    gst_amount: Joi.number().required(),
    total: Joi.number().required(),
    staff: Joi.string().required(),
  }),
  note: Joi.string(),
  vehicle_no: Joi.string().required(),
  delivery_charge: Joi.number().required(),
  total_taxable_amount: Joi.number().required(),
  discount: Joi.number().required(),
  gst_amount: Joi.number().required(),
  outstanding_amount: Joi.number().required(),
  payment_mode: Joi.string().required().valid('cheque', 'net banking', 'cash'),
  amount: Joi.number().required(),
  is_hold: Joi.boolean(),
  is_return: Joi.boolean(),
  round_off: Joi.number().required(),
  grand_total: Joi.number().required(),
});

export default billingValidation;
