import {
  approveEventById,
  approvePaymentById,
  rejectEventById,
  rejectPaymentById
} from './approvals.service.js';
import { auditLog } from '../../utils/auditLogger.js';

export async function approveEvent(req, res) {
  const event = await approveEventById(req.params.id, req.user);
  res.json(event);
}

export async function rejectEvent(req, res) {
  const event = await rejectEventById(req.params.id, req.user);
  res.json(event);
}

export async function approvePayment(req, res) {
  const payment = await approvePaymentById(req.params.id, req.user);
  res.json(payment);
}

export async function rejectPayment(req, res) {
  const payment = await rejectPaymentById(req.params.id, req.user);
  res.json(payment);
}
