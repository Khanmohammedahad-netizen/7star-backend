import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  getMaterialsByEvent,
  addMaterial,
  updateMaterial,
  deleteMaterial
} from './materials.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard);

router.get('/event/:eventId', getMaterialsByEvent);

router.post(
  '/',
  roleGuard(['admin', 'senior_manager', 'manager']),
  addMaterial
);

router.put(
  '/:id',
  roleGuard(['admin', 'senior_manager', 'manager']),
  updateMaterial
);

router.delete(
  '/:id',
  roleGuard(['admin', 'senior_manager']),
  deleteMaterial
);

export default router;
