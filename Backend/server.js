require('dotenv').config()
const bodyParser = require('body-parser');
const {getRouter, postRouter, deleteRouter, putRouter} = require('./routes/iceCravings.routes.js');
const express =require("express")
const app=express()
const mongoose=require("mongoose")
const {connectDB,isConnected}=require('./config/dbConn.js')

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


  
app.listen(1000, async()=>{
    await connectDB();
    console.log('Hey')
});
