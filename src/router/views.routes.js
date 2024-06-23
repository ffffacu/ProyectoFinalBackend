import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import { newServer } from "../app.js";



const router = Router();

router.get("/", async (req,res)=>{
    try {
        const products = await productDao.getProducts();
        const cleanedProducts = products.docs.map(product => {
            return {
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                status: product.status
            };
        });
        
        res.render("home", { product: cleanedProducts });
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}   
})

router.get("/realtimeproducts", async (req,res)=>{
    try {
        const product = await productDao.getProducts();
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})} 
})

router.post("/realtimeproducts", async (req,res)=>{
    try {
        const {title,price,description}=req.body;
        await productDao.create({title,price,description});
        const product = await productDao.getProducts();
        newServer.emit ("deletList")
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");

    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/realtimeproducts", async (req,res)=>{
    try {
        const {id}=req.body;
        await productsManagers.deleteProduct(Number(id));
        const product = await productDao.getProducts();
        newServer.emit ("deletList")
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})} 
})
export default router;
