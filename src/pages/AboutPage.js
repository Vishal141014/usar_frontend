import React from 'react';
import { FaLightbulb, FaRobot, FaMicrochip, FaGraduationCap } from 'react-icons/fa';
import { getImagePath } from '../utils/imageUtils';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">About USAR</h1>
          <p className="mt-2 text-xl text-gray-600">
            University School of Automation and Robotics
          </p>
        </div>
        
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                The GGS Indraprastha University-East Campus is committed to providing students with a world-class learning experience, fostering their holistic development. This exemplary campus seamlessly blends aesthetics and technology. As India embraces the fourth Industrial Revolution, the university has taken proactive steps by establishing the University School of Automation & Robotics (USAR) at the East Campus in Surajmal Vihar, New Delhi.
              </p>
              <p className="text-gray-600">
                USAR focuses on cutting-edge fields such as Artificial Intelligence & Data Science, Artificial Intelligence & Machine Learning, Industrial Internet of Things, and Automation & Robotics. Our goal is to prepare students for the technological challenges and opportunities of the future.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={getImagePath('img2.jpg')}
                alt="USAR Campus" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Programs Offered */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Programs Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:bg-teal/5">
              <div className="flex items-center justify-center w-16 h-16 bg-teal/20 rounded-full mx-auto mb-4">
                <FaLightbulb size={28} className="text-teal" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">AI & Machine Learning</h3>
              <p className="text-gray-600 text-center">
                A cutting-edge program focused on artificial intelligence algorithms, neural networks, and machine learning applications.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:bg-yellow/5">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow/20 rounded-full mx-auto mb-4">
                <FaGraduationCap size={28} className="text-yellow" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">AI & Data Science</h3>
              <p className="text-gray-600 text-center">
                Combines AI with data science methodologies to extract insights from complex datasets and drive decision-making.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:bg-red/5">
              <div className="flex items-center justify-center w-16 h-16 bg-red/20 rounded-full mx-auto mb-4">
                <FaRobot size={28} className="text-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Automation & Robotics</h3>
              <p className="text-gray-600 text-center">
                Focuses on designing and implementing automated systems and robotic solutions for industrial and commercial applications.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg hover:bg-purple/5">
              <div className="flex items-center justify-center w-16 h-16 bg-purple/20 rounded-full mx-auto mb-4">
                <FaMicrochip size={28} className="text-purple" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Industrial IoT</h3>
              <p className="text-gray-600 text-center">
                Explores Internet of Things technologies with industrial applications, smart manufacturing, and connected systems.
              </p>
            </div>
          </div>
        </div>
        
        {/* Campus Facilities */}
        <div className="bg-offwhite rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Campus Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Centralized Auditorium with a capacity of 650 students</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Amphitheatre with strength of 500 students</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Centralized Airconditioned Library</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Computer Centre with latest technology</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Advanced Laboratories for Physics, Chemistry, Engineering Graphics, Computers and Electrical Science</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">World class Studios</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Sports Hall for 300 spectators</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Hostel facilities for boys and girls</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Earth Air Tunnel system for Automatic cooling</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal rounded-full mr-3 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">Abundant Greenery, Unique Architecture, and Multi-level parking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to be a part of the future?</h2>
          <p className="text-gray-600 mb-8">
            The University focuses on developing the entrepreneurship and employability skills of the students with state-of-the-art facilities.
          </p>
          <a 
            href="http://ipu.ac.in/eastcampusmain.php" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            Visit University Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 