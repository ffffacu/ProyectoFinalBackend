import {Router} from 'express';
import cartsManeger from '../cartsManeger.js';
import productsManeger from '../productsManeger.js';

const router = Router();


router.post("/", async(req,res)=>{
    try {
        const cart = await cartsManeger.cartGenerator();
        res.status(200).json({status:"success", cart});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.get("/:cid", async(req,res)=>{
    try {
        const {cid} = req.params;
        const cartSelect = await cartsManeger.cartId(Number(cid));
        if (!cartSelect)return res.status(400).json({status:"Error", msg: "Carrito no encontrado"})
        res.status(200).json({status:"success", cartSelect})
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid, pid} =req.params
        const products = await productsManeger.getProductsById(Number(pid));
        if(!products) return res.status(400).json({status:"Error",msg:"Producto no encontrado"});
        const cartSelect = await cartsManeger.cartProduct(Number(cid), pid);
        if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
        res.status(201).json({status:"success", cartSelect});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

export default router;