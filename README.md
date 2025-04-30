# USAR Placement Frontend

This is the frontend application for USAR Placement system. It's built with React and connects to a backend API.

## Backend Integration

The frontend is configured to connect to the backend API hosted at:
https://usar-backend.onrender.com/api

This URL is set as the default API endpoint in the application. If you need to use a different API URL during local development, you can set the `REACT_APP_API_URL` environment variable.

## Development

1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Build for production: `npm run build`

## Deployment

This frontend is configured to be deployed on Vercel. In the Vercel deployment settings, make sure to set the `REACT_APP_API_URL` environment variable to point to the production backend URL.
