const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/help", async(req, res) =>{
    res.send(`Available options:
        - /createProduct
        - /createLofP
        - /getProducts`);
});

router.post("/createProduct", async(req, res) =>{
    try{
        console.log("is it here..?")
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.post("/createLofP", async(req,res) =>{
    try{
        const products = await Product.insertMany(req.body);
        res.status(201).json({
            message: `${products.length} products inserted successfully.`,
            count: products.length,
            products: products
        });
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.get("/getProducts", async(req, res) =>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err){
        res.status(400).json({ error: err.message});
    }
});

module.exports = router;