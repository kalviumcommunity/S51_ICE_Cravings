const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.dataURI)
        console.log("Connected to MongoDB");

    }catch(err){
        console.log("error", err)
    }
  
     

}
const isConnected = ()=>{
    return mongoose.connection.readyState === 1
}
module.exports={connectDB,isConnected};