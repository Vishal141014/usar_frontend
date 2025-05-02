import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBuilding, FaFileAlt, FaChartLine } from 'react-icons/fa';
import ImageSlider from '../components/ImageSlider';
import WelcomeAnimation from '../components/WelcomeAnimation';
import PlacementHighlights from '../components/PlacementHighlights';
import CompanyLogoSlider from '../components/CompanyLogoSlider';
import { getImagePath } from '../utils/imageUtils';

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  
  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };
  
  // Sample images for the slider with corrected paths
  const sliderImages = [
    {
      src: getImagePath('mainGate.jpg'),
      alt: 'USAR Campus',
      title: 'USAR Campus',
      caption: 'State-of-the-art campus facilities',
      description: 'The University School of Automation and Robotics campus offers cutting-edge facilities for students and faculty.'
    },
    {
      src: getImagePath('img1.jpg'),
      alt: 'USAR Students',
      title: 'Student Life',
      caption: 'Vibrant and dynamic student community',
      description: 'Students at USAR enjoy a vibrant campus life with numerous opportunities for academic and personal growth.'
    },
    {
      src: getImagePath('img2.jpg'),
      alt: 'Placement Drive',
      title: 'Placement Drive',
      caption: 'Connect with top companies',
      description: 'Our placement cell organizes regular recruitment drives with top companies across various industries.'
    },
    {
      src: getImagePath('img3.jpg'),
      alt: 'Advanced Labs',
      title: 'Advanced Research Labs',
      caption: 'Cutting-edge research facilities',
      description: 'USAR is equipped with modern research laboratories for robotics, AI, IoT, and other emerging technologies.'
    }
  ];
  
  return (
    <>
      {showAnimation && <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />}
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-teal py-20" style={{ background: 'linear-gradient(135deg, #1995AD 0%, #A1D6E2 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                  <span className="block">Welcome to USAR</span>
                  <span className="block text-lightgray mt-2">Placement Portal</span>
                </h1>
                <p className="mt-4 text-xl text-white">
                  University School of Automation and Robotics - Shaping the future of technology and innovation.
                </p>
                <div className="mt-10">
                  <Link to="/placements" className="btn-secondary mr-4 hover:scale-105 transition-transform" style={{ backgroundColor: '#F1F1F2', color: '#1995AD' }}>
                    View Placements
                  </Link>
                  <Link to="/contact" className="btn-primary hover:scale-105 transition-transform" style={{ backgroundColor: '#F52549', color: '#F1F1F2' }}>
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2">
                <ImageSlider images={sliderImages} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Placement Highlights - Using the dynamic component */}
        <PlacementHighlights />
        
        {/* Statistics */}
        <div className="py-12 bg-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Our Achievements</h2>
              <p className="mt-2 text-xl text-gray-600">Excellence in education and placements</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal/20 rounded-full mb-4">
                  <FaGraduationCap size={30} className="text-teal" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">NAAC A++</h3>
                <p className="text-gray-600">Accreditation</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-lightblue/20 rounded-full mb-4">
                  <FaChartLine size={30} className="text-lightblue" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">NIRF 74</h3>
                <p className="text-gray-600">National Ranking</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink/20 rounded-full mb-4">
                  <FaBuilding size={30} className="text-pink" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">50+</h3>
                <p className="text-gray-600">Recruiting Companies</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red/20 rounded-full mb-4">
                  <FaFileAlt size={30} className="text-red" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">QS 1401</h3>
                <p className="text-gray-600">International Ranking</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message to Recruiters */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2 lg:pr-12">
                <h2 className="text-3xl font-bold" style={{ color: '#1995AD' }}>Message to Recruiters</h2>
                <div className="mt-6 text-gray-700 space-y-4">
                  <p>
                    Our students, faculty and management work hard and collaborate comprehensively to achieve excellence in the disciplines of engineering, technology and innovation required to fuel smart automation, industrial revolution, development of intelligent systems and devices, and improve the quality of life of mankind.
                  </p>
                  <p>
                    The curriculum and infrastructure at USAR are a testament to excellence in digital and technological advancements. Our students are assured to fulfill the great prospects and promises of the fourth industrial revolution with a strong emphasis on efficiency.
                  </p>
                  <p>
                    We eagerly look forward to welcome you and your team at USAR and facilitate the recruitment of our graduates to your esteemed organization. Our primary aim is to actively assist you to identify and hire individuals who are the most suitable to meet your organizational requirements. Through this collaboration, we endeavor to cultivate a prosperous and enduring recruitment relationship.
                  </p>
                </div>
                <div className="mt-8">
                  <a 
                    href="https://sites.google.com/view/ggsipuedc/students/training-placement/tp-usar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary mr-4 hover:scale-105 transition-transform" 
                    style={{ backgroundColor: '#1995AD', color: 'white' }}
                  >
                    Placement Brochure
                  </a>
                  <a 
                    href="https://sites.google.com/view/ggsipuedc/students/training-placement/tp-usar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-secondary hover:scale-105 transition-transform"
                    style={{ backgroundColor: '#F52549', color: '#F1F1F2' }}
                  >
                    Job Application Form
                  </a>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2">
                <img 
                  src={getImagePath('img5.jpg')} 
                  alt="USAR Students" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Logo Slider */}
        <CompanyLogoSlider />
        
        {/* Contact Info */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold" style={{ color: '#1995AD' }}>Contact Us</h2>
              <p className="mt-4 text-xl text-gray-600">
                We're here to assist with your placement queries
              </p>
              <div className="mt-6 inline-flex items-center justify-center">
                <Link to="/contact" className="btn-primary hover:scale-105 transition-transform" style={{ backgroundColor: '#F52549', color: '#F1F1F2' }}>
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage; 