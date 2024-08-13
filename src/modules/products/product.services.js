import productDao from "./product.dao.js";

const getAllProduct = async (querry,options) => {return await productDao.getProducts(querry,options)}

const getProductById = async (pid) => {return await productDao.getProductsById(pid);}

const createProduct = async  (body) => {return await productDao.create(body)}

const upDateProduct = async(pid,body) => {return await productDao.update(pid,body)}

const deleteProduct = async(pid) => {return await productDao.deleteOne(pid);}

export default {getAllProduct,getProductById,createProduct,upDateProduct,deleteProduct}