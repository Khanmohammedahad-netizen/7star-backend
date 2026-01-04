import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  getPaymentsByEvent,
  addPayment,
  updatePayment
} from './payments.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard);

router.get('/event/:eventId', getPaymentsByEvent);

router.post(
  '/',
  roleGuard(['admin', 'senior_manager']),
  addPayment
);

router.put(
  '/:id',
  roleGuard(['admin', 'senior_manager']),
  updatePayment
);

export default router;
