import { cartModel } from "./models/cart.model.js";

const getAll = async ()=>{
    const carts = await cartModel.find();
    return carts
}

const cartId = async (id)=>{
    const cartId = await  cartModel.findById(id).populate("products.product");
    return cartId
}

const create = async ()=>{
    const cart = await cartModel.create({});
    return cart
}

const update = async (id, data )=>{
    const cartUpdate = await cartModel.findByIdAndUpdate(id,data,{new:true})
    return cartUpdate
}

const deleteCart = async (id)=>{
    const cart = await cartModel.findByIdAndDelete({_id:id})
    return cart
}

const addProductToCart = async (cid,pid) =>{
    const productInCart = await cartModel.findOneAndUpdate({_id:cid, "products.product": pid},{$inc:{ "products.$.quantity":1}})
    if(!productInCart){
        await cartModel.updateOne({_id:cid},{$push:{products:{product:pid, quantity:1}}})
    }
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
}

const upDateQuantity = async (cid,pid,quantity)=>{
    await cartModel.findOneAndUpdate({_id:cid, "products.product": pid},{$set:{ "products.$.quantity":quantity}});
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
}

export default{getAll,cartId,create,update,deleteCart, addProductToCart,upDateQuantity};