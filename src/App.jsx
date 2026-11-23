import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CasesPage from './pages/CasesPage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import DataUploadPage from './pages/DataUploadPage';
import AnalysisPage from './pages/AnalysisPage';
import NetworkGraphPage from './pages/NetworkGraphPage';
import AiAssistantPage from './pages/AiAssistantPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="cases/:id" element={<CaseDetailsPage />} />
          <Route path="upload" element={<DataUploadPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="network" element={<NetworkGraphPage />} />
          <Route path="ai-assistant" element={<AiAssistantPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
