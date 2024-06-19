import { Router } from "express";
import productDao from "../dao/mongoDB/product.dao.js";
import { checkProduct } from "../middlewares/checkProduct.middlewares.js";

const router = Router();


router.get("/", async (req, res) => {
    try {

    const { limit, page, sort, category, status } = req.query;

    const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
            price: sort === "asc" ? 1 : -1,
        },
        learn: true,
    };

    if (category){
        const products = await productDao.getProducts({category}, options)
        return res.status(200).json({status:"success", products});
    }
    if (status){
        const products = await productDao.getProducts({status}, options)
        return res.status(200).json({status:"success", products});
    }
    const products = await productDao.getProducts({}, options);
    res.status(200).json({status:"success", products});
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.get("/:pid", async (req, res) => { 
    try {
        const { pid } = req.params;
        const product = await productDao.getProductsById(pid);
        if(!product)return res.status(404).json({status:"Error", msg :"Producto no encontrado"})
        res.status(200).json({status:"success", product});
        
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})};
})

router.post("/", async  (req, res) => {
    try {
        const body = req.body
        const product = await productDao.create(body);
        res.status(201).json({status:"success", product});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})};
})

router.put("/:pid", async(req, res) => {
    try {
        const {pid} = req.params;
        const body = req.body;
        const product = await productDao.update(pid,body);
        if(!product) return res.status(400).json({status:"Error", msg:"Producto no encontrado"})

    res.status(200).json({status:"Succcess", product});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

router.delete("/:pid", async(req, res) => {
    try {
        const {pid}= req.params
        const productDelete = await productDao.deleteOne(pid);
        if(!productDelete)return res.status(400).json({status:"Error", msg:"Producto no encontrado"})
        res.status(200).json({status:"Succcess", productDelete});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})}
})

export default router;