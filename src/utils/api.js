import axios from 'axios';

// Set base URL for API calls
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://usar-backend.onrender.com/api',
});

// Add authorization header to requests if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('Request with token:', req.url);
  }
  return req;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information for debugging
    console.error('API error:', error.response ? {
      status: error.response.status,
      data: error.response.data,
      url: error.config?.url
    } : error);

    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      // If not on login page, redirect to login
      if (!window.location.pathname.includes('/admin')) {
        console.log('Auth error detected, redirecting to login');
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

// Try to refresh token function
export const refreshAuthToken = async () => {
  try {
    // For demo, we will just reuse the hardcoded token
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluX2lkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE5NzA4ODAwLCJleHAiOjE5MTk3OTUyMDB9.BbXKLxNZ6MprUBj2dG7SFrGpXiHxqKj6_pXFspG9Hxw';
    localStorage.setItem('userToken', fakeToken);
    return fakeToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    window.location.href = '/admin';
    return null;
  }
};

// Authentication API calls
export const login = (formData) => API.post('/api/auth/login', formData);

// Placements API calls
export const fetchPlacements = () => API.get('/api/placements');
export const fetchPlacementById = (id) => API.get(`/api/placements/${id}`);
export const createPlacement = (placementData) => API.post('/api/placements', placementData);
export const updatePlacement = (id, placementData) => API.put(`/api/placements/${id}`, placementData);
export const deletePlacement = (id) => API.delete(`/api/placements/${id}`);

// Companies API calls
export const fetchCompanies = () => API.get('/api/companies');
export const fetchCompanyById = (id) => API.get(`/api/companies/${id}`);
export const createCompany = (companyData) => API.post('/api/companies', companyData);
export const updateCompany = (id, companyData) => API.put(`/api/companies/${id}`, companyData);
export const deleteCompany = (id) => API.delete(`/api/companies/${id}`);

// Contact API calls
export const fetchContacts = () => API.get('/api/contacts');
export const fetchContactById = (id) => API.get(`/api/contacts/${id}`);
export const createContact = (contactData) => API.post('/api/contacts', contactData);
export const deleteContact = (id) => API.delete(`/api/contacts/${id}`); 