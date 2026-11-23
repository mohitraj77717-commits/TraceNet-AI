import apiClient from './api';
import { MOCK_CASES, MOCK_STATISTICS, MOCK_RECENT_ACTIVITIES } from '../data/mockCases';

const CASES_STORAGE_KEY = 'tracenet_custom_cases';

function getStoredCases() {
  try {
    const saved = localStorage.getItem(CASES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse stored cases', e);
  }
  return MOCK_CASES;
}

function saveStoredCases(cases) {
  try {
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
  } catch (e) {
    console.error('Failed to save cases to storage', e);
  }
}

export const caseService = {
  async getCases() {
    try {
      const res = await apiClient.get('/cases');
      return { data: res.data, isMock: false };
    } catch {
      // Fallback to local / mock cases
      return { data: getStoredCases(), isMock: true };
    }
  },

  async getCaseById(id) {
    try {
      const res = await apiClient.get(`/cases/${id}`);
      return { data: res.data, isMock: false };
    } catch {
      const cases = getStoredCases();
      const found = cases.find(c => c.id === id) || cases[0];
      return { data: found, isMock: true };
    }
  },

  async createCase(newCaseData) {
    try {
      const res = await apiClient.post('/cases', newCaseData);
      return { data: res.data, isMock: false };
    } catch {
      const cases = getStoredCases();
      const caseId = `RJ-CYBER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const created = {
        id: caseId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: newCaseData.status || 'Active',
        priority: newCaseData.priority || 'High',
        totalCdrRecords: 0,
        totalIpdrRecords: 0,
        suspectsCount: 1,
        tags: newCaseData.tags || ['Cyber Crime'],
        ...newCaseData
      };
      const updatedList = [created, ...cases];
      saveStoredCases(updatedList);
      return { data: created, isMock: true };
    }
  },

  async getStatistics() {
    try {
      const res = await apiClient.get('/statistics');
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_STATISTICS, isMock: true };
    }
  },

  async getRecentActivities() {
    try {
      const res = await apiClient.get('/activities');
      return { data: res.data, isMock: false };
    } catch {
      return { data: MOCK_RECENT_ACTIVITIES, isMock: true };
    }
  }
};
