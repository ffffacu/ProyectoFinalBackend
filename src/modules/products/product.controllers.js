import productServices from "./product.services.js";

const getAllProduct = async (req, res) => {
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
        const products = await productServices.getAllProduct({category}, options)
        return res.status(200).json({status:"success", products});
    }
    if (status){
        const products = await productServices.getAllProduct({status}, options)
        return res.status(200).json({status:"success", products});
    }
    const products = await productServices.getAllProduct({}, options);
    res.status(200).json({status:"success", products});
    } catch (error) { res.status(500).json({status:"Error", msg:"Error del servidor"})}
}

const getProductById = async (req, res) => { 
    try {
        const {pid} = req.params;
        const product = await productServices.getProductById(pid);
        if(!product)return res.status(404).json({status:"Error", msg :"Producto no encontrado"})
        res.status(200).json({status:"success", product});
    } catch (error) {res.status(500).json({status:"Error", msg:"Error del servidor"})};
}

const createProduct = async  (req, res) => {
    try {
        const body = req.body
        const product = await productServices.createProduct(body);
        res.status(201).json({status:"success", product});
    } catch (error) {
    if (error.name === 'ValidationError') {
        res.status(400).send({status:"Error", message: 'Faltan datos requeridos', errors: error.errors });
    } else {
        res.status(500).json({status:"Error", msg:"Error del servidor"});
    }};
}

const upDateProduct = async(req, res) => {
    try {
        const {pid} = req.params;
        const body = req.body;
        const product = await productServices.update(pid,body);
        if(!product) return res.status(400).json({status:"Error", msg:"Product no found"})

    res.status(200).json({status:"Succcess", product});
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

const deleteProduct = async(req, res) => {
    try {
        const {pid}= req.params
        const productDelete = await productServices.deleteProduct(pid);
        if(!productDelete)return res.status(400).json({status:"Error", msg:"Product no found"})
        res.status(200).json({status:"Succcess", productDelete});
    } catch (error) {res.status(500).json({status:"Error", msg:"Server error"})}
}

export default {getAllProduct,getProductById,createProduct,upDateProduct,deleteProduct}

