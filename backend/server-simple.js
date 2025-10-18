// Simple Express backend for immediate testing
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const JWT_SECRET = 'golden_errands_secret_2024';

// In-memory database (temporary)
const users = [
  {
    id: '1',
    email: 'admin@goldenerrands.com',
    password: bcrypt.hashSync('admin@2024', 10),
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN'
  },
  {
    id: '2',
    email: 'driver@goldenerrands.com',
    password: bcrypt.hashSync('driver@2024', 10),
    firstName: 'Kwame',
    lastName: 'Asante',
    role: 'DRIVER'
  },
  {
    id: '3',
    email: 'customer@example.com',
    password: bcrypt.hashSync('customer@2024', 10),
    firstName: 'John',
    lastName: 'Doe',
    role: 'CUSTOMER'
  }
];

const orders = [];

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Golden Errands API Server',
    timestamp: new Date().toISOString() 
  });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    accessToken: token,
    refreshToken: token
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: String(users.length + 1),
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
    role: 'CUSTOMER'
  };
  
  users.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, role: newUser.role, email: newUser.email }, JWT_SECRET, { expiresIn: '8h' });
  
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    message: 'Registration successful',
    user: userWithoutPassword,
    accessToken: token
  });
});

// Get profile
app.get('/api/auth/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const newOrder = {
      id: String(orders.length + 1),
      orderNumber: `GE-${Date.now()}`,
      customerId: decoded.id,
      ...req.body,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get orders
app.get('/api/orders', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    let filteredOrders = orders;
    
    if (decoded.role === 'CUSTOMER') {
      filteredOrders = orders.filter(o => o.customerId === decoded.id);
    }
    
    res.json({ 
      orders: filteredOrders,
      pagination: {
        total: filteredOrders.length,
        page: 1,
        limit: 20,
        pages: 1
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║         GOLDEN ERRANDS                       ║
  ║    Delivery Management System API            ║
  ║                                              ║
  ║    🚀 Server running on port ${PORT}            ║
  ║    📱 Frontend: http://localhost:5173        ║
  ║                                              ║
  ║    Test Accounts:                            ║
  ║    Admin: admin@goldenerrands.com            ║
  ║    Password: admin@2024                      ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
  console.log('✅ Backend ready at: http://localhost:4000');
  console.log('✅ Health check: http://localhost:4000/health');
  console.log('\n🔐 Login credentials:');
  console.log('   admin@goldenerrands.com / admin@2024');
  console.log('   driver@goldenerrands.com / driver@2024');
  console.log('   customer@example.com / customer@2024\n');
});
