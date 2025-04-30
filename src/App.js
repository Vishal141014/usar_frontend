import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import PlacementStatsPage from './pages/PlacementStatsPage';
import CompaniesPage from './pages/CompaniesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PlacementManage from './pages/admin/PlacementManage';
import CompanyManage from './pages/admin/CompanyManage';
import ContactManage from './pages/admin/ContactManage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated (token exists in local storage)
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/placements" element={<PlacementStatsPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/placements" 
              element={
                <ProtectedRoute>
                  <PlacementManage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/companies" 
              element={
                <ProtectedRoute>
                  <CompanyManage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/contacts" 
              element={
                <ProtectedRoute>
                  <ContactManage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App; 