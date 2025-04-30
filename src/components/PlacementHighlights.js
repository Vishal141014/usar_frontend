import React, { useState, useEffect } from 'react';
import { fetchCompanies, fetchPlacements } from '../utils/api';

const PlacementHighlights = () => {
  const [stats, setStats] = useState({
    companiesVisited: 35,
    averagePackage: 18.5,
    highestPackage: 25,
    lowestPackage: 12,
    studentsPlaced: 156
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch companies and placements data
        const companiesResponse = await fetchCompanies();
        const placementsResponse = await fetchPlacements();

        const companies = companiesResponse.data || [];
        const placements = placementsResponse.data || [];

        if (companies.length > 0 && placements.length > 0) {
          // Calculate stats from actual data
          const uniqueCompanies = new Set(companies.map(company => company.name));
          const packages = placements.map(placement => parseFloat(placement.package) || 0).filter(pkg => pkg > 0);
          
          setStats({
            companiesVisited: uniqueCompanies.size,
            averagePackage: packages.length > 0 ? 
              parseFloat((packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(1)) : 0,
            highestPackage: packages.length > 0 ? Math.max(...packages) : 0,
            lowestPackage: packages.length > 0 ? Math.min(...packages) : 0,
            studentsPlaced: placements.length
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching placement stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Animated counter component
  const AnimatedCounter = ({ value, label, borderColor }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (value > 0) {
        const duration = 2000; // ms
        const framesPerSecond = 60;
        const totalFrames = duration / 1000 * framesPerSecond;
        const increment = value / totalFrames;
        
        let currentCount = 0;
        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(currentCount);
          }
        }, 1000 / framesPerSecond);
        
        return () => clearInterval(timer);
      }
    }, [value]);
    
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 border-b-4 ${borderColor}`}>
        <div className="text-4xl font-bold mb-2" style={{ color: borderColor.replace('border-', 'text-') }}>
          {typeof count === 'number' && !Number.isInteger(count) ? count.toFixed(1) : Math.round(count)}
          {label === 'Average Package (LPA)' || label === 'Highest Package (LPA)' || label === 'Lowest Package (LPA)' ? '' : '+'}
        </div>
        <p className="text-gray-600">{label}</p>
      </div>
    );
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Placement Highlights</h2>
          <p className="mt-2 text-xl text-gray-600">Real-time placement insights</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <AnimatedCounter 
              value={stats.companiesVisited} 
              label="Companies Visited" 
              borderColor="border-teal" 
            />
            
            <AnimatedCounter 
              value={stats.averagePackage} 
              label="Average Package (LPA)" 
              borderColor="border-lightblue" 
            />
            
            <AnimatedCounter 
              value={stats.highestPackage} 
              label="Highest Package (LPA)" 
              borderColor="border-pink" 
            />
            
            <AnimatedCounter 
              value={stats.lowestPackage} 
              label="Lowest Package (LPA)" 
              borderColor="border-red" 
            />
            
            <AnimatedCounter 
              value={stats.studentsPlaced} 
              label="Students Placed" 
              borderColor="border-teal" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementHighlights; 