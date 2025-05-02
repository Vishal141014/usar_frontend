# USAR Placement Portal Frontend

This is the React-based frontend application for the USAR Placement Portal system, showcasing placement statistics and company information for the University School of Automation and Robotics.

## 🚀 Deployment

The frontend is deployed on Vercel: [https://usar-placement.vercel.app](https://usar-placement.vercel.app)

## 🔗 Backend Connection

The frontend is configured to connect to the backend API hosted at:
`https://usar-backend.onrender.com/api`

This URL is set as the default API endpoint in the application. For local development, you can set the `REACT_APP_API_URL` environment variable to point to your local backend server.

## ✨ Features

- Responsive design for all device sizes
- Interactive dashboard with placement statistics
- Company listings with sorting and filtering
- Student placement records display
- Admin panel for data management
- Contact form for inquiries
- Authentication system for admin users

## 🛠️ Development

1. Clone the repository:
   ```
   git clone https://github.com/Vishal141014/usar_placement.git
   cd usar_placement
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (for local development with the backend running on port 5000)

4. Start the development server:
   ```
   npm start
   ```

5. Build for production:
   ```
   npm run build
   ```

## 📦 Deployment

This frontend is deployed on Vercel. In the Vercel deployment settings, make sure to set the `REACT_APP_API_URL` environment variable to point to the production backend URL:
```
REACT_APP_API_URL=https://usar-backend.onrender.com/api
```

## 🔧 Tech Stack

- React.js
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization
- React Icons for UI elements

## 🔗 Related Repositories

- Backend API: [https://github.com/Vishal141014/usar_backend](https://github.com/Vishal141014/usar_backend)
