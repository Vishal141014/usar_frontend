import React, { useState, useEffect } from 'react';
import { fetchPlacements, fetchCompanies } from '../utils/api';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PlacementStatsPage = () => {
  const [placements, setPlacements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch placements and companies data
        const placementsData = await fetchPlacements();
        const companiesData = await fetchCompanies();
        
        setPlacements(placementsData.data || []);
        setCompanies(companiesData.data || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load placement data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Calculate chart data for student placements by company
  const getStudentsByCompanyChartData = () => {
    if (companies.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Number of Students Placed',
            data: [],
            backgroundColor: [
              '#64AEF6', // blue
              '#FBE859', // yellow
              '#DB3525', // red
              '#D78AD5', // purple
              '#4CAF50', // green
              '#FF9800', // orange
            ],
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      };
    }
    
    return {
      labels: companies.map(company => company.name),
      datasets: [
        {
          label: 'Number of Students Placed',
          data: companies.map(company => company.studentsPlaced),
          backgroundColor: [
            '#64AEF6', // blue
            '#FBE859', // yellow
            '#DB3525', // red
            '#D78AD5', // purple
            '#4CAF50', // green
            '#FF9800', // orange
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  };
  
  // Calculate chart data for average packages
  const getAveragePackageChartData = () => {
    if (companies.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Average Package (LPA)',
            data: [],
            backgroundColor: '#64AEF6',
            borderColor: '#1e40af',
            borderWidth: 1,
          },
        ],
      };
    }
    
    return {
      labels: companies.map(company => company.name),
      datasets: [
        {
          label: 'Average Package (LPA)',
          data: companies.map(company => company.package),
          backgroundColor: '#64AEF6',
          borderColor: '#1e40af',
          borderWidth: 1,
        },
      ],
    };
  };
  
  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Package by Company (in LPA)',
        font: {
          size: 16,
        },
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
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
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Placement Statistics</h1>
          <p className="mt-2 text-xl text-gray-600">
            Explore the placement achievements of our students
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Bar data={getAveragePackageChartData()} options={barOptions} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Pie data={getStudentsByCompanyChartData()} options={pieOptions} />
              </div>
            </div>
            
            {/* Placement Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Placement Records</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
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
                        Session
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
                    {placements.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No placement records found.
                        </td>
                      </tr>
                    ) : (
                      placements.map((placement, index) => (
                        <tr key={placement._id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
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
                            <div className="text-sm text-gray-500">{placement.session}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{placement.companyName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-teal">{placement.package}</div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlacementStatsPage; 