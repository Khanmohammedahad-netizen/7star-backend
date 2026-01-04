import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  generateEventPdf,
  generateEventExcel
} from './reports.controller.js';

const router = express.Router();

router.use(verifyToken, regionGuard, roleGuard(['admin','senior_manager']));

router.get('/event/:id/pdf', generateEventPdf);
router.get('/event/:id/excel', generateEventExcel);

export default router;
