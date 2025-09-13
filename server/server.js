const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Improved CORS configuration with two allowed origins
const allowedOrigins = [process.env.CLIENT_URL, process.env.FRONTEND_URL];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-side requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const recruiterProfileRoutes = require('./routes/recruiterProfileRoutes');
const seekerProfileRoutes = require('./routes/seekerProfileRoutes');
const roleRoutes = require('./routes/roleRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recruiter-profiles', recruiterProfileRoutes);
app.use('/api/seeker-profiles', seekerProfileRoutes);
app.use('/api/roles', roleRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
