import { Router } from "express";
import productsManagers from "../productsManeger.js";
import { newServer } from "../app.js";



const router = Router();

router.get("/", async (req,res)=>{
    try {
        const product = await productsManagers.getProducts();
        res.render("home", {product});
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}   
})

router.get("/realtimeproducts", async (req,res)=>{
    try {
        const product = await productsManagers.getProducts();
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})} 
})

router.post("/realtimeproducts", async (req,res)=>{
    try {
        const {title,price,description}=req.body;
        await productsManagers.addProduct({title,price,description});
        const product = await productsManagers.getProducts();
        newServer.emit ("deletList")
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");

    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/realtimeproducts", async (req,res)=>{
    try {
        const {id}=req.body;
        await productsManagers.deleteProduct(Number(id));
        const product = await productsManagers.getProducts();
        newServer.emit ("deletList")
        newServer.emit("productsViews", product);
        res.render("realTimeProducts");
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})} 
})
export default router;
