import express from 'express';
import cors from 'cors';

import eventsRoutes from './modules/events/events.routes.js';
import materialsRoutes from './modules/materials/materials.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import assignmentsRoutes from './modules/assignments/assignments.routes.js';
import approvalsRoutes from './modules/approvals/approvals.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/approvals', approvalsRoutes);
app.use('/api/reports', reportsRoutes);

export default app;
