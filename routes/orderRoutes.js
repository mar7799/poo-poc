const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product")

const router = express.Router();

router.post("/placeOrder",async (req,res) =>{

    try{
    const order = new Order(req.body);
    const products = order.products;
    console.log(products);
    for(const i of products){
        const product = await Product.findById(i.productId);

        if(!product) {
            throw new Error(`Product not found with Id: ${i.productId}`);
        }
        if(product.stock<i.quantity){
            throw new Error(`Not Enough Stock for ${product.name}`);
        }
        product.stock -= i.quantity;
        console.log(`...........`,product.stock);
        await product.save();
    }
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order: order });
} catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message});
}
});

module.exports = router;