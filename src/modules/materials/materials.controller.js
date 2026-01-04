import {
  fetchMaterialsByEvent,
  insertMaterial,
  updateMaterialById,
  deleteMaterialById
} from './materials.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function getMaterialsByEvent(req, res) {
  const materials = await fetchMaterialsByEvent(
    req.params.eventId,
    req.user.region
  );
  res.json(materials);
}

export async function addMaterial(req, res) {
  const material = await insertMaterial({
    ...req.body,
    event_id: req.body.event_id
  });

  await auditLog({
    userId: req.user.id,
    action: 'ADD_MATERIAL',
    entity: 'event_materials',
    entityId: material.id,
    region: req.user.region
  });

  res.status(201).json(material);
}

export async function updateMaterial(req, res) {
  const material = await updateMaterialById(
    req.params.id,
    req.body,
    req.user.region
  );

  if (!material) {
    return res.status(404).json({ error: 'Material not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'UPDATE_MATERIAL',
    entity: 'event_materials',
    entityId: material.id,
    region: req.user.region
  });

  res.json(material);
}

export async function deleteMaterial(req, res) {
  const success = await deleteMaterialById(
    req.params.id,
    req.user.region
  );

  if (!success) {
    return res.status(404).json({ error: 'Material not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'DELETE_MATERIAL',
    entity: 'event_materials',
    entityId: req.params.id,
    region: req.user.region
  });

  res.status(204).send();
}
