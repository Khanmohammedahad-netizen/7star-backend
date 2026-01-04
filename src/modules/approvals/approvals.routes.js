import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  approveEvent,
  approvePayment,
  rejectEvent,
  rejectPayment
} from './approvals.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard, roleGuard(['admin','senior_manager']));

router.post('/events/:id/approve', approveEvent);
router.post('/events/:id/reject', rejectEvent);

router.post('/payments/:id/approve', approvePayment);
router.post('/payments/:id/reject', rejectPayment);

export default router;
