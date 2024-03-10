require('dotenv').config()
const bodyParser = require('body-parser');
const {getRouter, postRouter, deleteRouter, putRouter} = require('./routes/iceCravings.routes.js');
const express =require("express")
const app=express()
const jwt = require("jsonwebtoken")
const {connectDB,isConnected}=require('./config/dbConn.js')
const fs = require('fs')
const bcrypt = require("bcrypt")

const cors = require("cors")
app.use(cors())
connectDB();
app.use(bodyParser.json());

app.get('/ping', (req,res) =>{
    res.send('Hello NODE API')
})
app.get('/home', (req,res) =>{
    res.json({
        message: isConnected()?"Database is connected":"Database is disconnected"
    })
})
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', putRouter);
app.use('/', deleteRouter);

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password)
    const users = getUsers();
    // Check if username already exists
    if ( users && users.find(user => user.username === username)) {
       res.status(404).json({ message: 'Username already exists' });
       return
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create new user
    const newUser = { username, password: hashedPassword };
    saveUsers(newUser);
  
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.SECERT_TOKEN);
    res.cookie('token', token)
    res.json({ token });
  });


  const usersFilePath = './user.json'
  // Login endpoint
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = getUsers()
    // Find user by username
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.SECERT_TOKEN);
    res.cookie('token', token)
    res.json({ token });
  })

  app.get('/logout', (req, res) => {
    // Clear the 'token' cookie by setting an empty value and an expiry date in the past
    res.clearCookie('token', { httpOnly: true, expires: new Date(0) });
    res.json({ message: 'Logged out successfully' });
});



  function getUsers() {
    try {
      const usersData = fs.readFileSync(usersFilePath, 'utf-8');
      return JSON.parse(usersData);
    } catch (error) {
      console.error('Error reading users data:', error);
      return [];
    }
  }

  // Function to save users to JSON file
  function saveUsers(users) {
    try {
        let existingUsers = [];
        if (fs.existsSync(usersFilePath)) {
            const data = fs.readFileSync(usersFilePath, 'utf8');
            existingUsers = JSON.parse(data);
        }
        existingUsers.push(users);
        fs.writeFileSync(usersFilePath, JSON.stringify(existingUsers, null, 2));
    } catch (error) {
        console.error('Error saving users data:', error);
    }
}

app.post('/protected', verifyToken, (req, res) => {
    if (req.user) {
        // If user is authenticated, return user information
        res.json({ authenticated: true, user: req.user });
      } else {
        // If user is not authenticated, return appropriate response
        res.json({ authenticated: false });
      }
  });
  
  // Middleware function to verify JWT token
  function verifyToken(req, res, next) {
    const token = req.body.token
    console.log(token)
    if (!token) {
      next()
      return
    }
  
    jwt.verify(token,  process.env.SECERT_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  }



  
app.listen(1000, async()=>{
    await connectDB();
    console.log('Hey')
});