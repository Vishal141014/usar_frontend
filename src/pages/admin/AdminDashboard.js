import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPlacements, fetchCompanies } from '../../utils/api';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaBuilding, FaClipboardList, FaSignOutAlt, FaEnvelope, FaHome, FaCog, FaSync } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [placements, setPlacements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data
        const placementsData = await fetchPlacements();
        const companiesData = await fetchCompanies();
        
        setPlacements(placementsData.data || []);
        setCompanies(companiesData.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate metrics
  const totalPlacements = placements.length;
  const totalCompanies = companies.length;
  const averagePackage = placements.length > 0 ? 
    (placements.reduce((sum, placement) => sum + Number(placement.package || 0), 0) / totalPlacements).toFixed(2) : 0;
  const highestPackage = placements.length > 0 ? 
    Math.max(...placements.map(placement => Number(placement.package || 0))) : 0;
  const lowestPackage = placements.length > 0 ? 
    Math.min(...placements.map(placement => Number(placement.package || 0))) : 0;
  
  // Chart data
  const chartData = {
    labels: companies.slice(0, 8).map(company => company.name), // Limit to 8 companies for better display
    datasets: [
      {
        label: 'Students Placed',
        data: companies.slice(0, 8).map(company => company.studentsPlaced),
        backgroundColor: '#1995AD',
        borderColor: '#A1D6E2',
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Students Placed by Company',
        font: {
          size: 16,
        },
      },
    },
  };
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    
    // Redirect to login page
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
            <h1 className="text-2xl font-bold text-teal">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {localStorage.getItem('username') || 'Admin'}
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
            <Link to="/admin/dashboard" className="btn-primary bg-teal text-white">
              <FaHome className="inline mr-2" />
              Dashboard
            </Link>
            <Link to="/admin/placements" className="btn-secondary bg-lightblue text-gray-800">
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
              onClick={handleLogout}
              className="btn-danger bg-red text-white md:ml-auto"
            >
              <FaSignOutAlt className="inline mr-2" />
              Logout
            </button>
          </nav>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal"></div>
          </div>
        ) : error ? (
          <div className="bg-red/10 border border-red text-red px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-teal/20 mr-4">
                    <FaUsers className="text-teal text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Placements</p>
                    <h3 className="text-2xl font-bold text-teal">{totalPlacements}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-lightblue/20 mr-4">
                    <FaBuilding className="text-lightblue text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Companies</p>
                    <h3 className="text-2xl font-bold text-teal">{totalCompanies}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-pink/20 mr-4">
                    <FaClipboardList className="text-pink text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Average Package</p>
                    <h3 className="text-2xl font-bold text-teal">{averagePackage} LPA</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red/20 mr-4">
                    <FaClipboardList className="text-red text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Highest Package</p>
                    <h3 className="text-2xl font-bold text-teal">{highestPackage} LPA</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-400/20 mr-4">
                    <FaClipboardList className="text-yellow-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Lowest Package</p>
                    <h3 className="text-2xl font-bold text-teal">{lowestPackage} LPA</h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {companies.length > 0 ? (
                <Bar data={chartData} options={chartOptions} />
              ) : (
                <div className="text-center p-6">
                  <p>No company data available. Add companies to see the chart.</p>
                </div>
              )}
            </div>
            
            {/* Recent Placements */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-teal">Recent Placements</h2>
                <Link to="/admin/placements" className="text-teal hover:text-lightblue transition duration-300">
                  View All
                </Link>
              </div>
              {placements.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-lightgray">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Branch
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Package (LPA)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {placements.slice(0, 5).map((placement, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-lightgray/30'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{placement.studentName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{placement.branch}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{placement.rollNo}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{placement.companyName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-pink font-medium">{placement.package}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p>No placement data available. Add placements to see them here.</p>
                </div>
              )}
            </div>
            
            {/* Recent Companies */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-teal">Companies</h2>
                <Link to="/admin/companies" className="text-teal hover:text-lightblue transition duration-300">
                  View All
                </Link>
              </div>
              {companies.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-lightgray">
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companies.slice(0, 5).map((company, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-lightgray/30'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-pink font-medium">{company.package}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{company.studentsPlaced}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p>No company data available. Add companies to see them here.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 