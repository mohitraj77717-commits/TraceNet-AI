import apiClient from './api';

// Service to handle CSV file parsing and validation for CDR and IPDR uploads
export const uploadService = {
  // Validate headers to determine whether file conforms to CDR or IPDR spec
  validateHeaders(headerLine, expectedType) {
    const headers = headerLine.split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
    
    if (expectedType === 'CDR') {
      const required = ['caller', 'receiver', 'timestamp'];
      const hasRequired = required.every(field => 
        headers.some(h => h.includes(field) || h === 'calling_number' || h === 'called_number')
      );
      return {
        isValid: hasRequired,
        detectedHeaders: headers,
        missing: required.filter(field => !headers.some(h => h.includes(field)))
      };
    } else if (expectedType === 'IPDR') {
      const required = ['ip', 'timestamp'];
      const hasRequired = required.every(field =>
        headers.some(h => h.includes(field) || h.includes('source') || h.includes('dest'))
      );
      return {
        isValid: hasRequired,
        detectedHeaders: headers,
        missing: required.filter(field => !headers.some(h => h.includes(field)))
      };
    }
    return { isValid: true, detectedHeaders: headers, missing: [] };
  },

  // Parse sample CSV on the client side for instant preview
  parseCsvPreview(text, maxRows = 6) {
    const lines = text.trim().split('\n');
    if (!lines.length) return { headers: [], rows: [] };
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
    const rows = lines.slice(1, maxRows + 1).map((line, idx) => {
      const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
      const obj = { _rowId: idx + 1 };
      headers.forEach((h, i) => {
        obj[h] = values[i] !== undefined ? values[i] : '';
      });
      return obj;
    });

    return { headers, rows, totalEstimatedLines: lines.length - 1 };
  },

  async uploadFile(file, caseId, dataType, onProgress) {
    // If Flask backend is available, send via FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);
    formData.append('dataType', dataType);

    try {
      const res = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        }
      });
      return { success: true, isMock: false, data: res.data };
    } catch {
      // Simulate realistic upload and parsing progress for mock demo
      return new Promise((resolve) => {
        let current = 0;
        const interval = setInterval(() => {
          current += 20;
          if (onProgress) onProgress(current);
          if (current >= 100) {
            clearInterval(interval);
            resolve({
              success: true,
              isMock: true,
              data: {
                fileName: file.name,
                fileSize: file.size,
                caseId,
                dataType,
                recordsIngested: dataType === 'CDR' ? 4200 : 18500,
                validRecords: dataType === 'CDR' ? 4188 : 18420,
                invalidRecords: dataType === 'CDR' ? 12 : 80,
                status: 'Processing Completed',
                timestamp: new Date().toISOString()
              }
            });
          }
        }, 150);
      });
    }
  }
};
