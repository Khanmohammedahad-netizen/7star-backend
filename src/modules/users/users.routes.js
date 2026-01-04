import express from 'express';
import { verifyToken } from '../../auth/verifyToken.js';
import { roleGuard } from '../../auth/roleGuard.js';
import { regionGuard } from '../../auth/regionGuard.js';
import {
  listUsers,
  createUser,
  updateUser,
  deactivateUser
} from './users.controller.js';

const router = express.Router();

// All user management is admin-only
router.use(verifyToken, regionGuard, roleGuard(['admin']));

router.get('/', listUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deactivateUser);

export default router;
