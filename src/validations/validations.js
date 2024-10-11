import { check } from 'express-validator';

const validateLeadID = [
    check('id').isNumeric().withMessage('ID must be a number'),
  ];

const validateRegister = [
  check('name').isString().withMessage('Name is required').notEmpty(),
  check('email').isEmail().withMessage('Invalid email format'),
  check('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  check('postcode').isString().withMessage('Postcode is required'),
  check('services')
    .isArray({ min: 1 }).withMessage('Services should be a non-empty array')
    .custom(services => {
      const allowedServices = ['delivery', 'pickup', 'payment'];
      for (const service of services) {
        if (!allowedServices.includes(service)) {
          throw new Error(`Invalid service: ${service}. Allowed services are delivery, pickup, and payment.`);
        }
      }
      return true;
    }),
];

export { validateLeadID, validateRegister };
