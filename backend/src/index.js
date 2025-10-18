// Minimal Express backend for Delivery Management MVP (demo)
const express = require('express');
const cors = require('cors');
const { Low, JSONFile } = require('lowdb');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// lowdb setup
const dbFile = path.join(__dirname, '..', 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDB(){
  await db.read();
  db.data = db.data || { users: [], orders: [] };
  // create demo admin and driver
  if(!db.data.users.find(u=>u.email==='admin@demo.com')){
    const salt = bcrypt.genSaltSync(8);
    db.data.users.push({
      id: nanoid(),
      name: 'Admin Demo',
      email: 'admin@demo.com',
      password: bcrypt.hashSync('password', salt),
      role: 'admin'
    });
  }
  if(!db.data.users.find(u=>u.email==='driver@demo.com')){
    const salt = bcrypt.genSaltSync(8);
    db.data.users.push({
      id: nanoid(),
      name: 'Driver Demo',
      email: 'driver@demo.com',
      password: bcrypt.hashSync('password', salt),
      role: 'driver',
      currentLocation: { lat: 5.6, lng: -0.2 }
    });
  }
  await db.write();
}
initDB();

const JWT_SECRET = 'change_this_in_prod';

// simple auth
app.post('/api/auth/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u=>u.email===email);
  if(!user) return res.status(401).json({error:'Invalid credentials'});
  const ok = bcrypt.compareSync(password, user.password);
  if(!ok) return res.status(401).json({error:'Invalid credentials'});
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  const { password:_, ...safe } = user;
  res.json({ token, user: safe });
});

// register (customer)
app.post('/api/auth/register', async (req, res) => {
  await db.read();
  const { name, email, password } = req.body;
  if(db.data.users.find(u=>u.email===email)) return res.status(400).json({error:'Email exists'});
  const salt = bcrypt.genSaltSync(8);
  const user = { id: nanoid(), name, email, password: bcrypt.hashSync(password, salt), role: 'customer' };
  db.data.users.push(user);
  await db.write();
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  const { password:_, ...safe } = user;
  res.json({ token, user: safe });
});

// auth middleware
function auth(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({error:'No token'});
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){ return res.status(401).json({error:'Invalid token'}); }
}

// file uploads for proof of delivery
const uploadDir = path.join(__dirname, '..', 'uploads');
if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const upload = multer({ dest: uploadDir });

// Orders CRUD
app.get('/api/orders', auth, async (req,res)=>{
  await db.read();
  // admin sees all; driver sees assigned; customer sees own
  const role = req.user.role;
  let orders = db.data.orders || [];
  if(role==='driver') orders = orders.filter(o=>o.driverId === req.user.id);
  if(role==='customer') orders = orders.filter(o=>o.customerId === req.user.id);
  res.json(orders);
});

app.post('/api/orders', auth, async (req,res)=>{
  await db.read();
  const { pickupAddress, deliveryAddress, scheduledAt, items } = req.body;
  const order = {
    id: nanoid(),
    pickupAddress, deliveryAddress, scheduledAt, items,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customerId: req.user.id
  };
  db.data.orders.push(order);
  await db.write();
  res.json(order);
});

app.put('/api/orders/:id/assign', auth, async (req,res)=>{
  // only admin/dispatcher
  if(!['admin','dispatcher'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const { driverId } = req.body;
  await db.read();
  const order = db.data.orders.find(o=>o.id===req.params.id);
  if(!order) return res.status(404).json({error:'Order not found'});
  order.driverId = driverId;
  order.status = 'assigned';
  await db.write();
  res.json(order);
});

app.put('/api/orders/:id/status', auth, async (req,res)=>{
  const { status } = req.body;
  await db.read();
  const order = db.data.orders.find(o=>o.id===req.params.id);
  if(!order) return res.status(404).json({error:'Order not found'});
  // driver can update status if assigned
  if(req.user.role==='driver' && order.driverId !== req.user.id) return res.status(403).json({error:'Not assigned'});
  order.status = status;
  await db.write();
  res.json(order);
});

app.post('/api/orders/:id/pod', auth, upload.single('file'), async (req,res)=>{
  await db.read();
  const order = db.data.orders.find(o=>o.id===req.params.id);
  if(!order) return res.status(404).json({error:'Order not found'});
  if(req.user.role !== 'driver') return res.status(403).json({error:'Only driver'});
  order.pod = { filename: req.file.filename, originalname: req.file.originalname, uploadedAt: new Date().toISOString() };
  order.status = 'delivered';
  await db.write();
  res.json(order);
});

// simple users list
app.get('/api/users', auth, async (req,res)=>{
  await db.read();
  if(req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  const safe = db.data.users.map(u=>({ id:u.id, name:u.name, email:u.email, role:u.role }));
  res.json(safe);
});

// mock driver location update
app.post('/api/drivers/:id/location', auth, async (req,res)=>{
  const { lat, lng } = req.body;
  await db.read();
  const user = db.data.users.find(u=>u.id===req.params.id && u.role==='driver');
  if(!user) return res.status(404).json({error:'Driver not found'});
  user.currentLocation = { lat, lng, updatedAt: new Date().toISOString() };
  await db.write();
  res.json({ ok:true });
});

// static uploads serve
app.use('/uploads', express.static(uploadDir));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend running on', PORT));
