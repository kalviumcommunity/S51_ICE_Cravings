const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const IceCravings = require("../models/ice_cravings.model")


getRouter.get('/getallIce',async (req, res) => {
    try{
        const iceCravings = await IceCravings.find();
        res.status(200).json(iceCravings);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

getRouter.get('/getice/:id',async (req, res) => {
    try{
        const iceCravings = await IceCravings.findone({id:query});
        res.status(200).json(iceCravings);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

postRouter.post('/addice',async (req, res) => {
    try{
        let{id,iceVariety,Price,Availability,Density,Temperature,Clarity,Hardness,meltingTime,Notes} = req.body;
        const iceCravings = await IceCravings.create({id,iceVariety,Price,Availability,Density,Temperature,Clarity,Hardness,meltingTime,Notes});
        res.status(201).json(iceCravings);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

putRouter.patch('/updateicecravings/:id',async (req, res) => {
    try {
        const filter ={"id":Number(req.params.id)}
        let{id,iceVariety,Price,Availability,Density,Temperature,Clarity,Hardness,meltingTime,Notes} = req.body;
        const iceCravings = await IceCravings.findOneAndUpdate(filter,{id,iceVariety,Price,Availability,Density,Temperature,Clarity,Hardness,meltingTime,Notes});
        res.status(200).json(iceCravings);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

deleteRouter.delete('/deleteicecravings/:id',async (req, res) => {
    try {
        const filter ={"id":Number(req.params.id)}
        const iceCravings = await IceCravings.findOneAndDelete(filter);
        res.status(200).json(iceCravings);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

module.exports = {getRouter, postRouter, deleteRouter, putRouter};