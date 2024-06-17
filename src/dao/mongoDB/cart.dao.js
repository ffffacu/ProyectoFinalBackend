import { cartModel } from "./models/cart.model.js";

const getAll = async ()=>{
    const carts = await cartModel.find();
    return carts
}

const cartId = async (id)=>{
    const cartId = cartModel.findById(id).populate("products.product");
    return cartId
}

const create = async ()=>{
    const cart = cartModel.create({});
    return cart
}

const update = async (id, data )=>{
    const cartUpdate = cartModel.findByIdAndUpdate(id,data,{new:true})
    return cartUpdate
}

const deleteCart = async (id)=>{
    const cart = await cartModel.findByIdAndDelete({_id:id})
    return cart
}


export default{getAll,cartId,create,update,deleteCart};