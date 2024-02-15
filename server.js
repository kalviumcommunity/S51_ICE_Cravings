const express = require("express")

const app = express()

app.get("/pong" , (req,res)=>{
    res.send("pong")
})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})
