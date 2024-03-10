const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const IceCravings = require("../models/ice_cravings.model")
const validateIceVariety =require("../dataValidator")

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

postRouter.post('/addice', async (req, res) => {
    const validationResult = validateIceVariety(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error });
    }
    try {
        const iceCravings = await IceCravings.create(validationResult.value);
        res.status(201).json(iceCravings);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.put("/updateicecravings/:id", async (req, res) => {
    const { id } = req.params;
    const validationResult = validateIceVariety(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error });
    }
    try {
        const newData = await IceCravings.findByIdAndUpdate(id, validationResult.value, { new: true }); 
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