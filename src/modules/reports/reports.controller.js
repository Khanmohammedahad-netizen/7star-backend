import { buildEventPdf, buildEventExcel } from './reports.service.js';

export async function generateEventPdf(req, res) {
  const stream = await buildEventPdf(req.params.id, req.user.region);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=event-report.pdf');

  stream.pipe(res);
}

export async function generateEventExcel(req, res) {
  const buffer = await buildEventExcel(req.params.id, req.user.region);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=event-report.xlsx'
  );

  res.send(buffer);
}
