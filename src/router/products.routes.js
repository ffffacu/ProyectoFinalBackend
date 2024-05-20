import { Router } from "express";
import productsManagers from "../productsManeger.js";
import { checkProduct } from "../middlewares/checkProduct.middlewares.js";

const router = Router();


router.get("/", async (req, res) => {
   try {
    const {limit} = req.query;
    const products = await productsManagers.getProducts(limit);
    res.status(200).json({status:"success", products});
    
   } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.get("/:pid", async (req, res) => { 
    try {
        const { pid } = req.params;
        const product = await productsManagers.getProductsById(Number(pid));
        if(!product)return res.status(404).json({status:"Error", msg :"Producto no encontrado"})
        res.status(200).json({status:"success", product});
        
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})};
})

router.post("/", checkProduct, async  (req, res) => {
    try {
        const body = req.body
        const product = await productsManagers.addProduct(body);
        res.status(201).json({status:"success", product});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})};
})

router.put("/:pid", async(req, res) => {
      try {
        const {pid} = req.params;
        const body = req.body;
        const product = await productsManagers.updateProduct(Number(pid),body);
        if(!product) return res.status(400).json({status:"Error", msg:"Producto no encontrado"})
  
       res.status(200).json({status:"Succcess", product});
      } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/:pid", async(req, res) => {
    try {
        const {pid}= req.params
        const productDelete = await productsManagers.deleteProduct(Number(pid));
        if(!productDelete)return res.status(400).json({status:"Error", msg:"Producto no encontrado"})
        res.status(200).json({status:"Succcess", productDelete});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

export default router;