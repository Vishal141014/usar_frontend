import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from '../../utils/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaBuilding, FaUsers, FaMoneyBillWave, FaHome, FaEnvelope, FaCog, FaSync } from 'react-icons/fa';

const CompanyManage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    package: '',
    studentsPlaced: ''
  });
  
  useEffect(() => {
    fetchCompanyData();
  }, []);
  
  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      
      // Fetch company data
      const response = await fetchCompanies();
      setCompanies(response.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company data:', error);
      setError('Failed to load company data. Please try again later.');
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'package' || name === 'studentsPlaced' ? parseInt(value) || '' : value
    });
  };
  
  const handleEdit = (company) => {
    setFormData({
      name: company.name,
      package: company.package,
      studentsPlaced: company.studentsPlaced
    });
    
    setCurrentId(company._id);
    setEditMode(true);
    setShowForm(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        // Call the API to delete the company
        await deleteCompany(id);
        
        // Update local state after successful deletion
        setCompanies(companies.filter(company => company._id !== id));
        
        toast.success('Company deleted successfully');
      } catch (error) {
        console.error('Error deleting company:', error);
        toast.error(error.response?.data?.message || 'Failed to delete company');
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.name || !formData.package || !formData.studentsPlaced) {
        toast.error('All fields are required');
        return;
      }
      
      // Ensure numeric fields are numbers
      const companyData = {
        name: formData.name,
        package: parseInt(formData.package),
        studentsPlaced: parseInt(formData.studentsPlaced)
      };
      
      if (editMode) {
        // Update existing company
        const response = await updateCompany(currentId, companyData);
        
        // Update local state after API call
        setCompanies(
          companies.map(company => 
            company._id === currentId 
              ? { ...company, ...response.data } 
              : company
          )
        );
        
        toast.success('Company updated successfully');
      } else {
        // Create new company
        const response = await createCompany(companyData);
        
        // Add the new company to state with ID from response
        setCompanies([response.data, ...companies]);
        toast.success('Company added successfully');
      }
      
      // Reset form
      setFormData({
        name: '',
        package: '',
        studentsPlaced: ''
      });
      
      setShowForm(false);
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error(error.response?.data?.message || 'Failed to save company');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/admin');
  };
  
  const handleRefreshToken = () => {
    // Set a new token
    localStorage.setItem('userToken', 'admin_token_placeholder');
    toast.success('Token refreshed. Try your operation again.');
  };
  
  return (
    <div className="min-h-screen bg-offwhite py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-teal">Manage Companies</h1>
            <p className="text-gray-600">
              Add, update, or remove recruiting companies
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefreshToken}
              className="flex items-center bg-lightblue text-gray-800 px-3 py-1.5 rounded hover:bg-lightblue/80 transition duration-300"
            >
              <FaSync className="mr-2" />
              Refresh Token
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-red hover:text-red-700 transition duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
        
        {/* Admin Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/admin/dashboard" className="btn-secondary bg-lightblue text-gray-800">
              <FaHome className="inline mr-2" />
              Dashboard
            </Link>
            <Link to="/admin/placements" className="btn-secondary bg-lightblue text-gray-800">
              <FaUsers className="inline mr-2" />
              Manage Students
            </Link>
            <Link to="/admin/companies" className="btn-primary bg-teal text-white">
              <FaBuilding className="inline mr-2" />
              Manage Companies
            </Link>
            <Link to="/admin/contacts" className="btn-secondary bg-lightblue text-gray-800">
              <FaEnvelope className="inline mr-2" />
              Contact Messages
            </Link>
            <Link to="#" className="btn-secondary bg-lightblue text-gray-800">
              <FaCog className="inline mr-2" />
              Settings
            </Link>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditMode(false);
                setFormData({
                  name: '',
                  package: '',
                  studentsPlaced: ''
                });
              }}
              className={`${showForm && !editMode ? 'bg-red text-white' : 'bg-pink text-white'} md:ml-2 py-2 px-4 rounded hover:opacity-90 transition-opacity flex items-center`}
            >
              {showForm && !editMode ? 'Cancel' : <><FaPlus className="inline mr-2" /> Add New Company</>}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red text-white md:ml-auto py-2 px-4 rounded hover:opacity-90 transition-opacity flex items-center"
            >
              <FaSignOutAlt className="inline mr-2" />
              Logout
            </button>
          </nav>
        </div>
        
        {/* Company Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode ? 'Edit Company' : 'Add New Company'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
                    Package (LPA)
                  </label>
                  <input
                    type="number"
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter package in LPA"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="studentsPlaced" className="block text-sm font-medium text-gray-700 mb-1">
                    Students Placed
                  </label>
                  <input
                    type="number"
                    id="studentsPlaced"
                    name="studentsPlaced"
                    value={formData.studentsPlaced}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter number of students"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditMode(false);
                    setFormData({
                      name: '',
                      package: '',
                      studentsPlaced: ''
                    });
                  }}
                  className="btn-secondary mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editMode ? 'Update Company' : 'Add Company'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Companies ({companies.length})
              </h2>
            </div>
            
            {companies.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No companies found. Add a new company using the button above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package (LPA)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students Placed
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {companies.map((company, index) => (
                      <tr key={company._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaBuilding className="text-teal mr-2" />
                            <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaMoneyBillWave className="text-green-600 mr-2" />
                            <div className="text-sm text-gray-900">{company.package} LPA</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUsers className="text-purple mr-2" />
                            <div className="text-sm text-gray-900">{company.studentsPlaced}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(company)}
                              className="text-teal hover:text-teal/70 transition duration-300"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(company._id)}
                              className="text-red hover:text-red-700 transition duration-300"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyManage;