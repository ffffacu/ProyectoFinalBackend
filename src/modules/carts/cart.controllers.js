import cartServices from "./cart.services.js";
import  ticketServices  from "../ticket/ticket.services.js";
import {request, response} from "express";


const createCart = async(req = request, res = response)=>{
    try {
        const cart = await cartServices.createCart();
        res.status(200).json({status:"success", cart});
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const getCartById = async(req = request, res = response)=>{
    try {
        const {cid} = req.params;
        const cartSelect = await cartServices.getCartById(cid); 
        if (!cartSelect)return res.status(404).json({status:"Error", msg: "Cart not found"});
        res.status(200).json({status:"success", cartSelect})
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const getCartAll = async(req = request, res = response)=>{
    try {
        const carts= await cartServices.getCartAll();
        res.status(200).json({status:"success", carts})
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const addProductToCart = async(req = request, res = response)=>{
    try {
        const {cid, pid} =req.params;
            const addProduct = await cartServices.addProductToCart(cid,pid)
            res.status(201).json({status:"success", addProduct});
        } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
    }

const upDateQuantityProductToCart = async(req = request, res = response) => {
    try {
        const {cid, pid} =req.params;
        const {quantity} = req.body;
            const cartUpdate = await cartServices.upDateQuantityProductToCart(cid,pid,quantity)
            res.status(201).json({status:"success", cartUpdate});
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const deleteProductToCart = async(req = request, res = response)=>{
    try {
        const {cid, pid} =req.params;
            const cartDeleteProduct = await cartServices.deleteProductToCart(cid,pid)
            res.status(201).json({status:"success", cartDeleteProduct});
        
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const deleteAllProductToCart = async(req = request, res = response)=>{
    try {
        const {cid} =req.params;
        const cartSelect = await cartServices.getCartById(cid);
        if(!cartSelect) return res.status(400).json({status:"Error",msg:"Cart not found"});
        const cartDelete = await cartServices.deleteAllProductToCart(cid);
        res.status(201).json({status:"success", cartDelete});
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const getPurchaseToCart = async(req = request, res = response)=>{
    try {
        const {cid} = req.params;
        const cart = await cartServices.getCartById(cid);
        if(!cart) return res.status(400).json({status:"Error",msg:"Cart not found"});
        const total = await cartServices.purchaseCart(cid);
        if(total == 0) return res.status(400).json({status:"Error",cart,msg:`Product out of stock`});
        const ticket= await ticketServices.createTicket(req.user.email, total);
        res.status(201).json({status:"success", ticket, cart});
    } catch (error) {
        console.log(error)
        res.status(500).json({status:"Error", msg:"Server error"})
    }
}

export default {createCart,getCartAll,getCartById,addProductToCart,upDateQuantityProductToCart,deleteProductToCart,deleteAllProductToCart,getPurchaseToCart}
