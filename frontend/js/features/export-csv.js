export function downloadCsv(filename, headings, rows) {
  const escape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const csv = [headings, ...rows].map((row) => row.map(escape).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = filename; link.click(); URL.revokeObjectURL(link.href);
}
