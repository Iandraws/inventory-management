import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import HomePage from './pages/HomePage';
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
