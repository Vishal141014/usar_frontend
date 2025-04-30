import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPlacements, createPlacement, updatePlacement, deletePlacement } from '../../utils/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaHome, FaUsers, FaBuilding, FaEnvelope, FaCog, FaSync } from 'react-icons/fa';

const PlacementManage = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    studentName: '',
    branch: '',
    rollNo: '',
    session: '',
    companyName: '',
    package: ''
  });
  
  useEffect(() => {
    fetchPlacementData();
  }, []);
  
  const fetchPlacementData = async () => {
    try {
      setLoading(true);
      
      // Fetch placement data
      const response = await fetchPlacements();
      setPlacements(response.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching placement data:', error);
      setError('Failed to load placement data. Please try again later.');
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: name === 'package' ? parseFloat(value) || '' : value
    });
  };
  
  const handleEdit = (placement) => {
    setFormData({
      studentName: placement.studentName,
      branch: placement.branch,
      rollNo: placement.rollNo,
      session: placement.session,
      companyName: placement.companyName,
      package: placement.package
    });
    
    setCurrentId(placement._id);
    setEditMode(true);
    setShowForm(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this placement record?')) {
      try {
        // Call the API to delete the placement
        await deletePlacement(id);
        
        // Update local state after successful deletion
        setPlacements(placements.filter(placement => placement._id !== id));
        
        toast.success('Placement record deleted successfully');
      } catch (error) {
        console.error('Error deleting placement:', error);
        toast.error(error.response?.data?.message || 'Failed to delete placement record');
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!formData.studentName || !formData.branch || !formData.rollNo || 
          !formData.session || !formData.companyName || !formData.package) {
        toast.error('All fields are required');
        return;
      }
      
      // Prepare data with numeric fields as numbers
      const placementData = {
        ...formData,
        package: parseFloat(formData.package)
      };
      
      if (editMode) {
        // Update existing placement
        const response = await updatePlacement(currentId, placementData);
        
        // Update local state after API call
        setPlacements(
          placements.map(placement => 
            placement._id === currentId 
              ? { ...placement, ...response.data } 
              : placement
          )
        );
        
        toast.success('Placement record updated successfully');
      } else {
        // Create new placement
        const response = await createPlacement(placementData);
        
        // Add the new placement to state with ID from response
        setPlacements([response.data, ...placements]);
        toast.success('Placement record created successfully');
      }
      
      // Reset form
      setFormData({
        studentName: '',
        branch: '',
        rollNo: '',
        session: '',
        companyName: '',
        package: ''
      });
      
      setShowForm(false);
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error saving placement:', error);
      toast.error(error.response?.data?.message || 'Failed to save placement record');
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
            <h1 className="text-2xl font-bold text-teal">Manage Placements</h1>
            <p className="text-gray-600">
              Add, update, or remove placement records
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
            <Link to="/admin/placements" className="btn-primary bg-teal text-white">
              <FaUsers className="inline mr-2" />
              Manage Students
            </Link>
            <Link to="/admin/companies" className="btn-secondary bg-lightblue text-gray-800">
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
                  studentName: '',
                  branch: '',
                  rollNo: '',
                  session: '',
                  companyName: '',
                  package: ''
                });
              }}
              className={`${showForm && !editMode ? 'bg-red text-white' : 'bg-pink text-white'} md:ml-2 py-2 px-4 rounded hover:opacity-90 transition-opacity flex items-center`}
            >
              {showForm && !editMode ? 'Cancel' : <><FaPlus className="inline mr-2" /> Add New Placement</>}
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
        
        {/* Placement Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode ? 'Edit Placement Record' : 'Add New Placement Record'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                    Branch / Specialization
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Automation & Robotics">Automation & Robotics</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Industrial IoT">Industrial IoT</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter roll number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Session
                  </label>
                  <input
                    type="text"
                    id="session"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="E.g., 2022-23"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
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
                    step="0.1"
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
                      studentName: '',
                      branch: '',
                      rollNo: '',
                      session: '',
                      companyName: '',
                      package: ''
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
                  {editMode ? 'Update Record' : 'Save Record'}
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
                Placement Records ({placements.length})
              </h2>
            </div>
            
            {placements.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No placement records found. Add a new record using the button above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Session
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {placements.map((placement, index) => (
                      <tr key={placement._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{placement.studentName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{placement.rollNo}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{placement.branch}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{placement.session}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{placement.companyName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-teal">{placement.package} LPA</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEdit(placement)}
                              className="text-teal hover:text-teal/70 transition duration-300"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(placement._id)}
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

export default PlacementManage; 