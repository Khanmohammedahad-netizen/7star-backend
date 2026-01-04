import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent
} from './events.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard);

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post(
  '/',
  roleGuard(['admin', 'senior_manager']),
  createEvent
);

router.put(
  '/:id',
  roleGuard(['admin', 'senior_manager']),
  updateEvent
);

export default router;
