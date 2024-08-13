import { request, response } from "express";
import cartDao from "../modules/carts/cart.dao.js";
import productDao from "../modules/products/product.dao.js";

export const checkProductAndCart = async (req = request, res = response, next)=>{
    try {
        const {cid, pid} =req.params;
        const products = await productDao.getProductsById(pid);
        if(!products) return res.status(400).json({status:"Error",msg:"Producto no encontrado"});
        const cartSelect = await cartDao.cartId(cid);
        if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
        next()
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"});}
}