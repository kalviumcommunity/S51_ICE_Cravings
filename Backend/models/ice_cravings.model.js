const mongoose=require('mongoose')
const iceCravingsSchema = new mongoose.Schema({
    id:{type:Number},
    iceVariety: {type:String},
    Price: {type:String},
    Availability: {type:String},
    Density: {type:Number},
    Temperature: {type:Number},
    Clarity: {type:String},
    Hardness: {type:Number},
    meltingTime: {type: Number},
    Notes: {type:String}
},{
    timestamps: true
})
module.exports=mongoose.model("iceCravings",iceCravingsSchema)