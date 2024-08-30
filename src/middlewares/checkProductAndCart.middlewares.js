import { request, response } from "express";
import cartRepository from "../modules/carts/cart.repository.js";
import productRepository from "../modules/products/product.repository.js";

export const checkProductAndCart = async (req = request, res = response, next)=>{
    try {
        const {cid, pid} =req.params;
        const products = await productRepository.getProductsById(pid);
        if(!products) return res.status(400).json({status:"Error",msg:"Producto no encontrado"});
        const cartSelect = await cartRepository.cartId(cid);
        if(!cartSelect) return res.status(400).json({status:"Error",msg:"Carrito no encontrado"});
        next()
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"});}
}