import {productsModel} from "./product.model.js";

const  getProducts = async (querry,options)=>{
    const products = await productsModel.paginate(querry,options)
    return products
}

const getProductsById = async (id) =>{
    const productId = await productsModel.findById(id)
    return productId
}

const create = async (data)=>{
    const product = await productsModel.create(data)
    return product
}

const update = async (id, data) =>{
    const productUpdate = await productsModel.findByIdAndUpdate(id,data, {new:true});
    return productUpdate;
}

const deleteOne = async (id) =>{
    const productDelete = await productsModel.findByIdAndUpdate(id, {status:false}, {new:true});
    return productDelete
}

export default{getProducts,getProductsById,create,update,deleteOne}