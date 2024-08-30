import productRepository from "./product.repository.js";


const getAllProduct = async (querry,options) => {return await productRepository.getProducts(querry,options)}

const getProductById = async (pid) => {return await productRepository.getProductsById(pid);}

const createProduct = async  (body) => {return await productRepository.create(body)}

const upDateProduct = async(pid,body) => {return await productRepository.update(pid,body)}

const deleteProduct = async(pid) => {return await productRepository.deleteOne(pid);}

export default {getAllProduct,getProductById,createProduct,upDateProduct,deleteProduct}