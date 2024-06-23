import {Router} from 'express';
import productDao from '../dao/mongoDB/product.dao.js';
import cartDao from '../dao/mongoDB/cart.dao.js';
import { checkProductAndCart } from '../middlewares/checkProductAndCart.middlewares.js';



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
        if (!cartSelect)return res.status(404).json({status:"Error", msg: "Carrito no encontrado"});
        res.status(200).json({status:"success", cartSelect})
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.get("/", async(req,res)=>{
    try {
        const carts= await cartDao.getAll();
        res.status(200).json({status:"success", carts})
        
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})


router.post("/:cid/product/:pid",checkProductAndCart, async(req,res)=>{
    try {
        const {cid, pid} =req.params;
            const addProduct = await cartDao.addProductToCart(cid,pid)
            res.status(201).json({status:"success", addProduct});
        } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
    })

router.put("/:cid/product/:pid",checkProductAndCart,async(req,res)=>{
    try {
        const {cid, pid} =req.params;
        const {quantity} = req.body;
            const cartUpdate = await cartDao.upDateQuantity(cid,pid,quantity)
            res.status(201).json({status:"success", cartUpdate});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/:cid/product/:pid",checkProductAndCart,async(req,res)=>{
    try {
        const {cid, pid} =req.params;
            const cartDeleteProduct = await cartDao.deleteProductToCart(cid,pid)
            res.status(201).json({status:"success", cartDeleteProduct});
        
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/:cid", async(req,res)=>{
    try {
        const {cid} =req.params;
        const cartSelect = await cartDao.cartId(cid);
        if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
        const cartDelete = await cartDao.deleteAllProductToCart(cid);
        res.status(201).json({status:"success", cartDelete});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})


export default router;