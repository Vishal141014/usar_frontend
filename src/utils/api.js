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
export const login = (formData) => API.post('auth/login', formData);

// Placements API calls
export const fetchPlacements = () => API.get('placements');
export const fetchPlacementById = (id) => API.get(`placements/${id}`);
export const createPlacement = (placementData) => API.post('placements', placementData);
export const updatePlacement = (id, placementData) => API.put(`placements/${id}`, placementData);
export const deletePlacement = (id) => API.delete(`placements/${id}`);

// Companies API calls
export const fetchCompanies = () => API.get('companies');
export const fetchCompanyById = (id) => API.get(`companies/${id}`);
export const createCompany = (companyData) => API.post('companies', companyData);
export const updateCompany = (id, companyData) => API.put(`companies/${id}`, companyData);
export const deleteCompany = (id) => API.delete(`companies/${id}`);

// Contact API calls
export const fetchContacts = () => API.get('contacts');
export const fetchContactById = (id) => API.get(`contacts/${id}`);
export const createContact = (contactData) => API.post('contacts', contactData);
export const deleteContact = (id) => API.delete(`contacts/${id}`); 