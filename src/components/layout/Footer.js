import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaInfoCircle } from 'react-icons/fa';

const Footer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Campus Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Campus Address</h3>
            <p className="text-gray-300">
              Guru Gobind Singh Indraprastha University<br />
              East Delhi Campus<br />
              Surajmal Vihar, near The Leela Ambience Convention Hotel<br />
              Delhi-110032
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/placements" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Placement Stats
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                  About USAR
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setShowDisclaimer(!showDisclaimer)}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <FaInfoCircle className="mr-1" /> Disclaimer
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info & Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <p className="text-gray-300 mb-4">
              Email: placements.edc@ipu.ac.in<br />
              Website: http://ipu.ac.in/eastcampusmain.php
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Disclaimer Modal */}
        {showDisclaimer && (
          <div className="mt-8 border border-gray-600 rounded-lg p-6 bg-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Disclaimer: Student-Created Website</h3>
              <button 
                onClick={() => setShowDisclaimer(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-300 space-y-4">
              <p>
                This website is not an official platform of Guru Gobind Singh Indraprastha University (GGSIPU) or the University School of Automation and Robotics (USAR). It has been independently created by a student, Vishal Chaurasia, currently enrolled in the B.Tech (Artificial Intelligence and Data Science) program, Session: 2023–2027, Roll No: 60619071924, as a personal initiative to enhance the accessibility and visualization of placement-related data for academic and demonstrative purposes.
              </p>
              <p>
                All content displayed on this platform is either mock data or derived from publicly available information. This project is unaffiliated with and not endorsed by GGSIPU or USAR. It is intended for educational and informational use only.
              </p>
              <p>
                The official website for the East Delhi Campus of GGSIPU can be accessed at:<br />
                <a 
                  href="https://sites.google.com/view/ggsipuedc/home" 
                  className="text-lightblue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://sites.google.com/view/ggsipuedc/home
                </a>
              </p>
              <p>
                All trademarks, logos, and images used remain the property of their respective owners. They are used here under fair use for non-commercial academic demonstration.
              </p>
              <p>
                By accessing this website, you acknowledge that it is a student project, and the developer bears no legal responsibility for the accuracy, completeness, or official validity of the information presented. For verified details, please refer to the official university channels.
              </p>
              <p>
                If you have any queries, feedback, or concerns, feel free to reach out to the developer:
              </p>
              <div>
                <p>👨‍💻 Vishal Chaurasia</p>
                <div className="flex space-x-4 mt-2">
                  <a 
                    href="https://www.linkedin.com/in/vishal-chaurasia14/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lightblue hover:underline flex items-center"
                  >
                    <FaLinkedin className="mr-1" /> LinkedIn
                  </a>
                  <a 
                    href="https://www.instagram.com/v_shal_140/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lightblue hover:underline flex items-center"
                  >
                    <FaInstagram className="mr-1" /> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-600 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Guru Gobind Singh Indraprastha University, East Delhi Campus. All Rights Reserved.
          </p>
          <p className="mt-2">
            <button 
              onClick={() => setShowDisclaimer(!showDisclaimer)} 
              className="text-gray-400 hover:text-white underline"
            >
              Disclaimer: Student-Created Website
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 