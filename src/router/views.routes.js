import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import { newServer } from "../app.js";
import cartDao from "../dao/mongoDB/cart.dao.js";


const router = Router();

router.get("/products", async (req,res)=>{
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
        // Se copiaron las propiedades necesarias para renderisar ya que me saltaba error de propiedades heredadas al enviarlas directamente
        res.render("home", { product: cleanedProducts });
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}   
})

router.get("/products/:pid", async (req,res)=>{
    try {
        const {pid}=req.params;
        const product = await productDao.getProductsById(pid);
        if (product) {
            res.render("productsId", product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
       
    }
})

router.post("/products/:pid", async (req,res)=>{
    try {
        const {productId}=req.body;
        const cartSelect = "667779b61fba6714bb02c3e8";
        await cartDao.addProductToCart(cartSelect,productId)
        res.status(200).json({status:"success", productId});
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
