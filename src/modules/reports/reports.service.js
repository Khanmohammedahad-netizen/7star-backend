import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { supabaseAdmin } from '../../config/supabase.js';

export async function buildEventPdf(eventId, region) {
  const { data: event } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', eventId)
    .eq('region', region)
    .single();

  const { data: materials } = await supabaseAdmin
    .from('event_materials')
    .select('*')
    .eq('event_id', eventId);

  const { data: payments } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('event_id', eventId);

  const doc = new PDFDocument();
  doc.fontSize(18).text('Event Report', { underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`Event: ${event.event_name}`);
  doc.text(`Client: ${event.client_name}`);
  doc.text(`Date: ${event.event_date}`);
  doc.text(`Status: ${event.approval_status}`);
  doc.moveDown();

  doc.text('Materials:');
  materials.forEach(m => {
    doc.text(`- ${m.material_name}: ₹${m.total_cost}`);
  });

  doc.moveDown();
  doc.text('Payments:');
  payments.forEach(p => {
    doc.text(`- ₹${p.amount} (${p.status})`);
  });

  doc.end();
  return doc;
}

export async function buildEventExcel(eventId, region) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Event Report');

  const { data: event } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', eventId)
    .eq('region', region)
    .single();

  const { data: materials } = await supabaseAdmin
    .from('event_materials')
    .select('*')
    .eq('event_id', eventId);

  const { data: payments } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('event_id', eventId);

  sheet.addRow(['Event Name', event.event_name]);
  sheet.addRow(['Client', event.client_name]);
  sheet.addRow(['Date', event.event_date]);
  sheet.addRow([]);

  sheet.addRow(['Materials']);
  sheet.addRow(['Name', 'Total Cost']);
  materials.forEach(m => {
    sheet.addRow([m.material_name, m.total_cost]);
  });

  sheet.addRow([]);
  sheet.addRow(['Payments']);
  sheet.addRow(['Amount', 'Status']);
  payments.forEach(p => {
    sheet.addRow([p.amount, p.status]);
  });

  return workbook.xlsx.writeBuffer();
}
