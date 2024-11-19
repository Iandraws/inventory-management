import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';


const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to="/inventory" replace />} />
      <Route path="/inventory" element={<InventoryPage />} />
     
    </Routes>
  </Router>
);

export default AppRoutes;
