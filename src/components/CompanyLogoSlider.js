import React, { useState, useEffect, useCallback } from 'react';
import { getImagePath } from '../utils/imageUtils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CompanyLogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // Company logos with their names
  const companyLogos = [
    { src: getImagePath('Amazon.png'), name: 'Amazon' },
    { src: getImagePath('Adobe.png'), name: 'Adobe' },
    { src: getImagePath('google.jpg'), name: 'Google' },
    { src: getImagePath('Infosys.jpg'), name: 'Infosys' },
    { src: getImagePath('TCS.webp'), name: 'TCS' },
    { src: getImagePath('samsung.webp'), name: 'Samsung' },
    { src: getImagePath('Hitachi.jpg'), name: 'Hitachi' },
    { src: getImagePath('IBM.webp'), name: 'IBM' },
    { src: getImagePath('Flipkart.png'), name: 'Flipkart' },
    { src: getImagePath('Paytm.webp'), name: 'Paytm' },
    { src: getImagePath('Phonepe.jpg'), name: 'PhonePe' },
    { src: getImagePath('nagarro.webp'), name: 'Nagarro' },
    { src: getImagePath('tata.webp'), name: 'Tata' },
    { src: getImagePath('Wipro.jpeg'), name: 'Wipro' },
    { src: getImagePath('ion.webp'), name: 'ION' },
  ];
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? companyLogos.length - 1 : prev - 1));
  }, [companyLogos.length]);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === companyLogos.length - 1 ? 0 : prev + 1));
  }, [companyLogos.length]);
  
  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);
  
  // Memoized handlers
  const handleTouchEnd = useCallback((e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [touchStartX, nextSlide, prevSlide]);
  
  useEffect(() => {
    // Auto slide every 3 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [nextSlide]); // Now nextSlide is stable due to useCallback
  
  // Get visible logos for desktop display (5 at a time)
  const getVisibleLogos = () => {
    const result = [];
    const totalLogos = companyLogos.length;
    
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i - 2 + totalLogos) % totalLogos;
      result.push({
        ...companyLogos[index],
        position: i, // 0-4, where 2 is the middle
      });
    }
    
    return result;
  };
  
  const visibleLogos = getVisibleLogos();
  
  return (
    <div className="py-12 bg-lightgray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold" style={{ color: '#1995AD' }}>Our Recruiters</h2>
          <p className="mt-2 text-xl text-gray-600">
            Top companies that trust our graduates
          </p>
        </div>
        
        {/* Desktop & Tablet Slider (5 logos per row with middle one popped up) */}
        <div className="hidden md:block relative">
          <div className="relative px-10 py-8 mx-auto max-w-4xl">
            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100"
            >
              <FaChevronLeft className="text-teal" />
            </button>
            
            <div className="flex items-center justify-center">
              {visibleLogos.map((logo, idx) => {
                // Middle item (position 2) gets special styling
                const isMiddle = idx === 2;
                
                return (
                  <div 
                    key={idx} 
                    className={`${isMiddle ? 'w-48 mx-4 z-10' : 'w-40 mx-2 opacity-80'} flex flex-col items-center transition-all duration-300`}
                  >
                    <div 
                      className={`${isMiddle ? 'w-44 h-44 shadow-xl' : 'w-36 h-36 shadow-md'} 
                                  bg-white rounded-lg p-4 flex items-center justify-center overflow-hidden
                                  transition-all duration-300 transform ${isMiddle ? 'scale-110' : 'hover:scale-105'}`}
                    >
                      <img 
                        src={logo.src} 
                        alt={logo.name} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className={`mt-2 text-center font-medium ${isMiddle ? 'text-teal text-lg' : 'text-gray-700'}`}>
                      {logo.name}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100"
            >
              <FaChevronRight className="text-teal" />
            </button>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {companyLogos.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-teal w-5' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile Slider (card style) */}
        <div 
          className="md:hidden px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative overflow-hidden">
            <div className="flex justify-center">
              <div 
                className="w-64 h-64 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center overflow-hidden transform transition-all duration-300"
              >
                <img 
                  src={companyLogos[currentIndex].src} 
                  alt={companyLogos[currentIndex].name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-lg font-medium text-teal">
              {companyLogos[currentIndex].name}
            </p>
            
            {/* Mobile controls */}
            <div className="flex justify-between mt-6">
              <button 
                onClick={prevSlide}
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100"
              >
                <FaChevronLeft className="text-teal" />
              </button>
              
              {/* Indicator */}
              <div className="flex items-center space-x-1">
                {companyLogos.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-teal w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100"
              >
                <FaChevronRight className="text-teal" />
              </button>
            </div>
            
            <p className="text-center mt-6 text-gray-500 text-sm">
              Swipe left or right to see more companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoSlider; 