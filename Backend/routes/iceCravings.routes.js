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
    const { id } = req.params;
    try{
        const iceCravings = await IceCravings.findByIdAndUpdate(id, req.body, { new: true });
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

putRouter.put("/updateicecravings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const newData = await IceCravings.findByIdAndUpdate(id, req.body, { new: true }); 
        if (newData) {
            res.json(newData);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

deleteRouter.delete("/deleteicecravings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await IceCravings.findByIdAndDelete(id); 
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = {getRouter, postRouter, deleteRouter, putRouter};