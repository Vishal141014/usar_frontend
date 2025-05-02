import React, { useState, useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
// import { getImagePath } from '../utils/imageUtils';

const WelcomeAnimation = ({ onAnimationComplete }) => {
  const [currentText, setCurrentText] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoZoom, setLogoZoom] = useState(false);
  
  const welcomeTexts = [
    "Welcome to GGSIPU",
    "USAR Campus",
    "Placement Portal"
  ];
  
  useEffect(() => {
    // Change text every 0.75 seconds to fit within 3 second timeline
    const textInterval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % welcomeTexts.length);
        setFadeOut(false);
      }, 375);
    }, 750);
    
    // After 2.25 seconds, show the logo animation
    const logoTimeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowLogo(true);
        // Start logo zoom animation
        setLogoZoom(true);
        
        // After 0.75 seconds of logo animation, complete the animation sequence
        setTimeout(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 750);
      }, 375);
    }, 2250);
    
    return () => {
      clearInterval(textInterval);
      clearTimeout(logoTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAnimationComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-pink via-teal to-lightblue">
      <div className="text-center">
        {!showLogo ? (
          <>
            <h1 
              className={`text-4xl md:text-6xl font-bold text-white transform transition-all duration-500 ${
                fadeOut ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
              }`}
            >
              {welcomeTexts[currentText]}
            </h1>
            <div className="mt-8 flex justify-center">
              <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <div 
            className={`transition-all duration-1000 ${
              logoZoom ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
            }`}
          >
            <div className="text-white text-8xl">
              <FaGraduationCap />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeAnimation; 