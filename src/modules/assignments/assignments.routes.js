import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  getAssignmentsByEvent,
  assignUserToEvent,
  removeAssignment
} from './assignments.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard);

router.get('/event/:eventId', getAssignmentsByEvent);

router.post(
  '/',
  roleGuard(['admin','senior_manager','manager']),
  assignUserToEvent
);

router.delete(
  '/:id',
  roleGuard(['admin','senior_manager','manager']),
  removeAssignment
);

export default router;
