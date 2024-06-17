import { request, response } from "express";
import productsManeger from "../dao/fileSystem/productsManeger.js";

export const checkProduct = async (req = request, res = response, next)=>{
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct ={
            title, description, price, code, stock, category };
        const products = await productsManeger.getProducts();
        const productExists = products.find ((p)=> p.code === code);
        if (productExists) return res.status(400).json ({status:"Error", msg:`El producto con el codigo ${code} ya existe`});
        const check = Object.values(newProduct).includes(undefined);
        if(check) return res.status (400).json ({status:"Error", msg:"Todos los datos son obligatorios"});
        next()
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"});}
}