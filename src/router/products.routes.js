import { Router } from "express";

const router = Router();

let products=[];

router.get("/", (req, res) => {
    res.status(200).json(products);
})

router.get("/:pid", (req, res) => {   
    const { pid } = req.params;
    const product = products.filter(product => product.id.toString() === pid);
    res.status(200).json(product);
})

router.post("/", (req, res) => {

})

router.put("/",(req, res) => {

})

router.delete("/", (req, res) => {
    
})

export default router;