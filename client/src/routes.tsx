import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import AddItemPage from './pages/AddItemPage';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/add" element={<AddItemPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
