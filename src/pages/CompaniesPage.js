import React, { useState, useEffect } from 'react';
import { fetchCompanies } from '../utils/api';
import { FaBuilding, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch companies data
        const companiesData = await fetchCompanies();
        setCompanies(companiesData.data || []);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies data:', error);
        setError('Failed to load companies data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Recruiting Companies</h1>
          <p className="mt-2 text-xl text-gray-600">
            Our esteemed partners in shaping student careers
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-12">
                No companies found. Please check back later.
              </div>
            ) : (
              companies.map((company, index) => (
                <div key={company._id || index} className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:bg-teal/5 transform hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal/80 to-lightblue/80 rounded-full flex items-center justify-center mr-4 animate-pulse">
                        <FaBuilding size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {company.description || `${company.name} is one of our valued recruiting partners, offering excellent opportunities for our students.`}
                    </p>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <FaMoneyBillWave className="text-green-500 mr-2" />
                        <span className="text-gray-700">
                          <span className="font-bold">{company.package}</span> LPA
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="text-teal mr-2" />
                        <span className="text-gray-700">
                          <span className="font-bold">{company.studentsPlaced}</span> Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Interested in recruiting from USAR?</h2>
          <p className="text-gray-600 mb-8">
            Join our growing list of recruiting partners and connect with talented students from our university.
          </p>
          <a 
            href="https://sites.google.com/view/ggsipuedc/students/training-placement/tp-usar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            Contact Placement Cell
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage; 