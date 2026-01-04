import {
  fetchPaymentsByEvent,
  insertPayment,
  updatePaymentById
} from './payments.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function getPaymentsByEvent(req, res) {
  const payments = await fetchPaymentsByEvent(
    req.params.eventId,
    req.user.region
  );
  res.json(payments);
}

export async function addPayment(req, res) {
  const payment = await insertPayment({
    ...req.body,
    event_id: req.body.event_id
  });

  await auditLog({
    userId: req.user.id,
    action: 'ADD_PAYMENT',
    entity: 'payments',
    entityId: payment.id,
    region: req.user.region
  });

  res.status(201).json(payment);
}

export async function updatePayment(req, res) {
  const payment = await updatePaymentById(
    req.params.id,
    req.body,
    req.user.region
  );

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  await auditLog({
    userId: req.user.id,
    action: 'UPDATE_PAYMENT',
    entity: 'payments',
    entityId: payment.id,
    region: req.user.region
  });

  res.json(payment);
}
