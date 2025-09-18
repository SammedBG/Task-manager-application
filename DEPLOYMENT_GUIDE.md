# 🚀 Frontend Deployment Guide

## ✅ What I've Done

I've configured your frontend to use environment variables for the API URL, making it deployment-ready:

### 1. Created Axios Configuration (`frontend/src/config/axios.js`)
- Centralized API configuration with base URL from environment variables
- Automatic token handling with request interceptors
- Error handling for 401 responses (automatic logout)

### 2. Updated Context Files
- **AuthContext.js**: Now uses the configured axios instance
- **TaskContext.js**: Now uses the configured axios instance
- Removed manual token management (handled by interceptors)

### 3. Environment Configuration
- Created `.env` file with `REACT_APP_API_URL=http://localhost:5000`
- This can be easily changed for production deployment

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for React)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory**:
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   - Go to your project settings
   - Add environment variable: `REACT_APP_API_URL` = `https://your-backend-url.com`

4. **Redeploy** after setting environment variables

### Option 2: Netlify

1. **Build the project**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository

3. **Set Environment Variables**:
   - Go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com`

4. **Redeploy** after setting environment variables

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Add homepage to package.json**:
   ```json
   "homepage": "https://yourusername.github.io/task-manager-app"
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔧 Environment Variables Setup

### For Development
Your `.env` file should contain:
```env
REACT_APP_API_URL=http://localhost:5000
```

### For Production
Set the environment variable to your deployed backend URL:
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## 📋 Pre-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Environment variable `REACT_APP_API_URL` is set correctly
- [ ] Test the build locally: `npm run build`
- [ ] Verify all API endpoints work with the new configuration

## 🧪 Testing the Configuration

1. **Test locally with production URL**:
   ```bash
   cd frontend
   # Temporarily change .env to your production backend URL
   npm start
   ```

2. **Test the build**:
   ```bash
   npm run build
   # Serve the build folder to test production build
   npx serve -s build
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure your backend has CORS configured for your frontend domain
   - Check if the backend URL is correct

2. **Environment Variables Not Working**:
   - Make sure the variable name starts with `REACT_APP_`
   - Restart the development server after changing `.env`
   - For production, ensure variables are set in your hosting platform

3. **Build Failures**:
   - Check for any TypeScript errors
   - Ensure all dependencies are installed
   - Verify the build command works locally

## 🎯 Next Steps

1. **Deploy your backend** first (if not already done)
2. **Update the environment variable** with your backend URL
3. **Choose a deployment platform** and follow the steps above
4. **Test the deployed application** thoroughly

Your frontend is now ready for deployment! The axios configuration will automatically use the correct API URL based on your environment variables.
