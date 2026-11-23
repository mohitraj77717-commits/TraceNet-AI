// Export and Print Utilities

export function exportToCSV(data, filename = 'cyber_investigation_export.csv') {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }
  const headers = Object.keys(data[0]);
  const rows = data.map(item =>
    headers.map(header => {
      let val = item[header];
      if (val === null || val === undefined) val = '';
      const strVal = String(val).replace(/"/g, '""');
      return `"${strVal}"`;
    }).join(',')
  );

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPrint() {
  window.print();
}
