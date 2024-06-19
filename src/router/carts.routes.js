import {Router} from 'express';
import productDao from '../dao/mongoDB/product.dao.js';
import cartDao from '../dao/mongoDB/cart.dao.js';


const router = Router();


router.post("/", async(req,res)=>{
    try {
        const cart = await cartDao.create();
        res.status(200).json({status:"success", cart});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.get("/:cid", async(req,res)=>{
    try {
        const {cid} = req.params;
        const cartSelect = await cartDao.cartId(cid);
        if (!cartSelect)return res.status(400).json({status:"Error", msg: "Carrito no encontrado"})
        res.status(200).json({status:"success", cartSelect})
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})


router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid, pid} =req.params;
            const products = await productDao.getProductsById(pid);
            if(!products) return res.status(400).json({status:"Error",msg:"Producto no encontrado"});
            const cartSelect = await cartDao.cartId(cid);
            if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
            const addProduct = await cartDao.addProductToCart(cid,pid)
            res.status(201).json({status:"success", addProduct});
        } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
    })

router.put("/:cid/product/:pid",async(req,res)=>{
    try {
        const {cid, pid} =req.params;
        const {quantity} = req.body;
            const products = await productDao.getProductsById(pid);
            if(!products) return res.status(400).json({status:"Error",msg:"Producto no encontrado"});
            const cartSelect = await cartDao.cartId(cid);
            if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
            const cartUpdate = await cartDao.upDateQuantity(cid,pid,quantity)
            res.status(201).json({status:"success", cartUpdate});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})





export default router;