import {
  fetchUsersByRegion,
  createAuthUser,
  insertUserProfile,
  updateUserProfile,
  deleteUserProfile
} from './users.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function listUsers(req, res) {
  const users = await fetchUsersByRegion(req.user.region);
  res.json(users);
}

export async function createUser(req, res) {
  const { email, password, full_name, role } = req.body;

  const authUser = await createAuthUser(email, password);

  const profile = await insertUserProfile({
    id: authUser.id,
    email,
    full_name,
    role,
    region: req.user.region
  });

  await auditLog({
    userId: req.user.id,
    action: 'CREATE_USER',
    entity: 'users',
    entityId: profile.id,
    region: req.user.region
  });

  res.status(201).json(profile);
}

export async function updateUser(req, res) {
  const profile = await updateUserProfile(
    req.params.id,
    req.body,
    req.user.region
  );

  if (!profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'UPDATE_USER',
    entity: 'users',
    entityId: profile.id,
    region: req.user.region
  });

  res.json(profile);
}

export async function deactivateUser(req, res) {
  const success = await deleteUserProfile(
    req.params.id,
    req.user.region
  );

  if (!success) {
    return res.status(404).json({ error: 'User not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'DELETE_USER',
    entity: 'users',
    entityId: req.params.id,
    region: req.user.region
  });

  res.status(204).send();
}
