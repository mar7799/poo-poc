const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product")
const mongoose = require("mongoose");

const router = express.Router();

router.post("/placeOrder",async (req,res) =>{
    const session = mongoose.startSession();
    (await session).startTransaction();

    try{
    const order = new Order(req.body);
    const products = order.products;
    console.log(products);
    await order.save({session});
    for(const i of products){
        const product = await Product.findById(i.productId).session(session);

        if(!product) {
            throw new Error(`Product not found with Id: ${i.productId}`);
        }
        if(product.stock<i.quantity){
            throw new Error(`Not Enough Stock for ${product.name}`);
        }
        product.stock -= i.quantity;
        await product.save({session});
    }

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
} catch (err) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({ error: err.message});
}
});

module.exports = router;