import {
  fetchAssignmentsByEvent,
  insertAssignment,
  deleteAssignmentById
} from './assignments.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function getAssignmentsByEvent(req, res) {
  const data = await fetchAssignmentsByEvent(
    req.params.eventId,
    req.user.region
  );
  res.json(data);
}

export async function assignUserToEvent(req, res) {
  const assignment = await insertAssignment({
    event_id: req.body.event_id,
    user_id: req.body.user_id,
    assigned_by: req.user.id
  });

  await auditLog({
    userId: req.user.id,
    action: 'ASSIGN_USER',
    entity: 'event_assignments',
    entityId: assignment.id,
    region: req.user.region
  });

  res.status(201).json(assignment);
}

export async function removeAssignment(req, res) {
  const success = await deleteAssignmentById(
    req.params.id,
    req.user.region
  );

  if (!success) {
    return res.status(404).json({ error: 'Assignment not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'REMOVE_ASSIGNMENT',
    entity: 'event_assignments',
    entityId: req.params.id,
    region: req.user.region
  });

  res.status(204).send();
}
