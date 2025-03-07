const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/placeOrder",async (req,res) =>{
    try{
    const order = new Order(req.body);
    console.log(order);
    await order.save();
    res.status(201).json(order);
} catch (err) {
    res.status(400).json({ error: err.message});
}
});

module.exports = router;