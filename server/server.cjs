const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
});

app.use(cors());
app.use(express.json());

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artisan_cafe')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.cjs'));
app.use('/api/orders', require('./routes/orders.cjs'));
app.use('/api/reservations', require('./routes/reservations.cjs'));
app.use('/api/reviews', require('./routes/reviews.cjs'));
app.use('/api/admin', require('./routes/admin.cjs'));
app.use('/api/profile', require('./routes/profile.cjs'));
app.use('/api/menu', require('./routes/menu.cjs'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('🟢 New client:', socket.id);
  socket.on('disconnect', () => console.log('🔴 Client disconnected:', socket.id));
});

// Port fallback logic
const DEFAULT_PORT = parseInt(process.env.PORT || '5000', 10);
const MAX_PORT = DEFAULT_PORT + 10;

function startServer(port) {
  const srv = server.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${port}`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying next port...`);
      if (port < MAX_PORT) {
        startServer(port + 1);
      } else {
        console.error(`All ports ${DEFAULT_PORT}-${MAX_PORT} are in use. Exiting.`);
        process.exit(1);
      }
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(DEFAULT_PORT);