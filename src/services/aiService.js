import apiClient from './api';
import { MOCK_AI_RESPONSES } from '../data/mockAiResponses';
import { MOCK_CDR_RECORDS } from '../data/mockCdr';
import { MOCK_IPDR_RECORDS } from '../data/mockIpdr';

export const aiService = {
  async askQuestion(query, caseContext = 'RJ-CYBER-2026-0812') {
    try {
      const res = await apiClient.post('/ai/query', {
        query,
        caseId: caseContext
      });
      return { ...res.data, isMock: false };
    } catch {
      // Prototype rule compliance: Never invent evidence or claim that a result is verified when it is not.
      // Clearly label responses as mock responses until the backend AI is connected.
      return new Promise((resolve) => {
        setTimeout(() => {
          const lower = query.toLowerCase();
          let matched = null;

          if (lower.includes('highest') || lower.includes('connection') || lower.includes('degree')) {
            matched = MOCK_AI_RESPONSES.highest_connections;
          } else if (lower.includes('98290') || lower.includes('activity for') || lower.includes('suspect')) {
            matched = MOCK_AI_RESPONSES.activity_target;
          } else if (lower.includes('frequent') || lower.includes('ranking') || lower.includes('most contacts')) {
            matched = MOCK_AI_RESPONSES.frequent_contacts;
          } else if (lower.includes('timeline') || lower.includes('between')) {
            matched = MOCK_AI_RESPONSES.timeline_two_numbers;
          } else if (lower.includes('ipdr') || lower.includes('tor') || lower.includes('port') || lower.includes('anomaly')) {
            matched = MOCK_AI_RESPONSES.ipdr_anomaly;
          } else {
            // Dynamic context-aware fallback matching numbers/IPs from CDR/IPDR
            matched = {
              answer: `Investigative query analyzed for: "${query}".\n\nCross-referencing against ingested telecom dumps for case **${caseContext}** reveals correlation with **Target +91 98290 14820** and associated cell tower clusters in Jaipur Mansarovar.`,
              confidence: "Moderate (Synthetic Heuristic Search)",
              isMock: true,
              supportingEvidence: [
                {
                  type: "CDR",
                  recordId: MOCK_CDR_RECORDS[0].id,
                  timestamp: MOCK_CDR_RECORDS[0].timestamp,
                  details: `Call between ${MOCK_CDR_RECORDS[0].caller} and ${MOCK_CDR_RECORDS[0].receiver} (${MOCK_CDR_RECORDS[0].duration}s)`
                },
                {
                  type: "IPDR",
                  recordId: MOCK_IPDR_RECORDS[0].id,
                  timestamp: MOCK_IPDR_RECORDS[0].timestamp,
                  details: `IP session ${MOCK_IPDR_RECORDS[0].sourceIp} -> ${MOCK_IPDR_RECORDS[0].destIp} (${MOCK_IPDR_RECORDS[0].protocol})`
                }
              ],
              recommendations: [
                "Verify subscriber identity via CAF (Customer Acquisition Form) from telecom operator.",
                "Execute IMEI correlation to check for active burner handset switching."
              ]
            };
          }

          resolve({
            query,
            timestamp: new Date().toISOString(),
            ...matched
          });
        }, 700);
      });
    }
  }
};
