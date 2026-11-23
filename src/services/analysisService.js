import apiClient from './api';
import { MOCK_CDR_RECORDS, MOCK_CALL_TIMELINE, MOCK_FREQUENT_NUMBERS } from '../data/mockCdr';
import { MOCK_IPDR_RECORDS, MOCK_IPDR_TIMELINE } from '../data/mockIpdr';
import { MOCK_GRAPH_ELEMENTS } from '../data/mockNetwork';

export const analysisService = {
  async getCdrRecords(filters = {}) {
    try {
      const res = await apiClient.get('/cdr', { params: filters });
      return { data: res.data, isMock: false };
    } catch {
      let filtered = [...MOCK_CDR_RECORDS];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(r =>
          r.caller.toLowerCase().includes(q) ||
          r.receiver.toLowerCase().includes(q) ||
          (r.callerName && r.callerName.toLowerCase().includes(q)) ||
          (r.receiverName && r.receiverName.toLowerCase().includes(q)) ||
          (r.cellId && r.cellId.toLowerCase().includes(q)) ||
          (r.operator && r.operator.toLowerCase().includes(q))
        );
      }
      if (filters.callType && filters.callType !== 'All') {
        filtered = filtered.filter(r => r.callType === filters.callType);
      }
      if (filters.status && filters.status !== 'All') {
        filtered = filtered.filter(r => r.status === filters.status);
      }
      return { data: filtered, isMock: true };
    }
  },

  async getIpdrRecords(filters = {}) {
    try {
      const res = await apiClient.get('/ipdr', { params: filters });
      return { data: res.data, isMock: false };
    } catch {
      let filtered = [...MOCK_IPDR_RECORDS];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(r =>
          r.sourceIp.toLowerCase().includes(q) ||
          r.destIp.toLowerCase().includes(q) ||
          (r.domain && r.domain.toLowerCase().includes(q)) ||
          (r.isp && r.isp.toLowerCase().includes(q)) ||
          (r.notes && r.notes.toLowerCase().includes(q))
        );
      }
      if (filters.protocol && filters.protocol !== 'All') {
        filtered = filtered.filter(r => r.protocol === filters.protocol);
      }
      if (filters.status && filters.status !== 'All') {
        filtered = filtered.filter(r => r.status === filters.status);
      }
      return { data: filtered, isMock: true };
    }
  },

  async getCallTimeline() {
    try {
      const res = await apiClient.get('/analytics/call-timeline');
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_CALL_TIMELINE, isMock: true };
    }
  },

  async getIpdrTimeline() {
    try {
      const res = await apiClient.get('/analytics/ipdr-timeline');
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_IPDR_TIMELINE, isMock: true };
    }
  },

  async getFrequentNumbers() {
    try {
      const res = await apiClient.get('/analytics/frequent-numbers');
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_FREQUENT_NUMBERS, isMock: true };
    }
  },

  async getNetworkGraph(caseId) {
    try {
      const res = await apiClient.get(`/network-graph?caseId=${caseId || ''}`);
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_GRAPH_ELEMENTS, isMock: true };
    }
  }
};
