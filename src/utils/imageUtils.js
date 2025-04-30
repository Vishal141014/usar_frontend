// Function to get the correct path for images
export const getImagePath = (imageName) => {
  try {
    // First try the assets/photos folder
    const assetImage = require(`../assets/photos/${imageName}`);
    return assetImage;
  } catch (error) {
    // If not found, try the public/images folder
    return `/images/${imageName}`;
  }
};

// List of all available images
export const availableImages = [
  'logo.png',
  'placement Prof. Dr. Ajay s. singholi.png',
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg',
  'img10.jpg',
  'mainGate.jpg'
]; 