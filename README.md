# Advanced Task Management App (MERN Stack)

A full-featured task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, drag-and-drop functionality, analytics dashboard, and dark mode support.

## 🚀 Features

### Core Features
- ✅ **Task Management**: Create, edit, delete, and mark tasks as complete
- 🔐 **User Authentication**: JWT-based registration and login
- 🎯 **Task Filtering**: Filter by status (All, Completed, Pending) and tags
- 🎨 **Drag & Drop**: Reorder tasks with react-beautiful-dnd
- 📱 **Responsive Design**: Works on desktop and mobile devices

### Advanced Features
- 📅 **Due Dates**: Set and track task deadlines with visual indicators
- 🏷️ **Tags & Categories**: Organize tasks with custom tags
- 📊 **Analytics Dashboard**: View task statistics and activity charts
- 🌙 **Dark/Light Mode**: Toggle between themes with user preference persistence
- ⚡ **Real-time Updates**: Instant UI updates with optimistic rendering

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library with Hooks
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **react-beautiful-dnd** - Drag and drop functionality
- **Chart.js & react-chartjs-2** - Data visualization
- **TailwindCSS** - Styling framework
- **date-fns** - Date manipulation
- **react-datepicker** - Date selection component

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd task-manager-mern
   \`\`\`

2. **Install backend dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   \`\`\`

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string

5. **Run the backend server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Install frontend dependencies**
   \`\`\`bash
   cd frontend
   npm install
   \`\`\`

2. **Install additional dependencies**
   \`\`\`bash
   npm install react-beautiful-dnd chart.js react-chartjs-2 date-fns react-datepicker
   \`\`\`

3. **Setup TailwindCSS**
   \`\`\`bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   \`\`\`

4. **Start the React development server**
   \`\`\`bash
   npm start
   \`\`\`
   The app will open at `http://localhost:3000`

## 🎯 Usage Guide

### Getting Started
1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in to access your personal task dashboard
3. **Create Tasks**: Click "Add Task" to create your first task with title, description, due date, tags, and priority
4. **Manage Tasks**: Edit, delete, or mark tasks as complete
5. **Organize**: Use drag-and-drop to reorder tasks and filters to organize your view

### Dashboard Features
- **Statistics Cards**: View total, completed, pending tasks, and completion rate
- **Activity Chart**: Track your task creation over the past week
- **Tag Distribution**: Visualize how your tasks are categorized
- **Recent Tasks**: Quick overview of your latest tasks

### Task Features
- **Priority Levels**: Set tasks as Low, Medium, or High priority
- **Due Date Tracking**: Visual indicators for overdue, due today, and upcoming tasks
- **Tag System**: Organize tasks with custom tags for easy filtering
- **Drag & Drop**: Reorder tasks by dragging them to new positions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/preferences` - Update user preferences

### Tasks
- `GET /api/tasks` - Get user's tasks (with filtering)
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/reorder` - Reorder tasks
- `GET /api/tasks/analytics` - Get task analytics

## 🎨 Customization

### Themes
The app supports dark and light modes. Theme preference is:
- Saved to localStorage for guests
- Synced to user profile for authenticated users
- Automatically detects system preference on first visit

### Styling
Built with TailwindCSS for easy customization:
- Modify `tailwind.config.js` for theme customization
- Custom animations and transitions included
- Responsive design breakpoints configured

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy the backend directory

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the build directory
3. Configure API proxy settings if needed

### Environment Variables for Production
\`\`\`env
# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
PORT=5000

# Frontend (if needed)
REACT_APP_API_URL=your_backend_api_url
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or connection string is correct
   - Check firewall settings for MongoDB Atlas

2. **CORS Issues**
   - Verify backend CORS configuration
   - Check if frontend proxy is set correctly

3. **JWT Token Issues**
   - Clear localStorage and re-login
   - Verify JWT_SECRET is set in backend

4. **Drag & Drop Not Working**
   - Ensure react-beautiful-dnd is properly installed
   - Check for React StrictMode conflicts

### Performance Tips
- Use React.memo for task components to prevent unnecessary re-renders
- Implement pagination for large task lists
- Consider using React Query for better caching and synchronization

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the documentation thoroughly

---

**Happy Task Managing! 🎉**
