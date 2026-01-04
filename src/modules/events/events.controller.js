import {
  fetchEvents,
  fetchEventById,
  insertEvent,
  updateEventById
} from './events.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function getEvents(req, res) {
  const events = await fetchEvents(req.user.region);
  res.json(events);
}

export async function getEventById(req, res) {
  const event = await fetchEventById(req.params.id, req.user.region);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
}

export async function createEvent(req, res) {
  const event = await insertEvent({
    ...req.body,
    region: req.user.region
  });

  await auditLog({
    userId: req.user.id,
    action: 'CREATE_EVENT',
    entity: 'events',
    entityId: event.id,
    region: req.user.region
  });

  res.status(201).json(event);
}

export async function updateEvent(req, res) {
  const event = await updateEventById(
    req.params.id,
    req.body,
    req.user.region
  );

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'UPDATE_EVENT',
    entity: 'events',
    entityId: event.id,
    region: req.user.region
  });

  res.json(event);
}
