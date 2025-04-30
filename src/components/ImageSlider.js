import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  
  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };
  
  const handleImageClick = (image) => {
    setPopupImage(image);
    setIsPopupVisible(true);
  };
  
  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupImage(null);
  };
  
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex' }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="min-w-full h-full relative"
            style={{ flexShrink: 0 }}
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        onClick={prevSlide}
      >
        <FaChevronLeft size={20} />
      </button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        onClick={nextSlide}
      >
        <FaChevronRight size={20} />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      {/* Image Popup */}
      {isPopupVisible && popupImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closePopup}
        >
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-all z-10"
              onClick={closePopup}
            >
              ✕
            </button>
            <img 
              src={popupImage.src}
              alt={popupImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800">{popupImage.title}</h3>
              <p className="text-gray-600">{popupImage.description || popupImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider; 