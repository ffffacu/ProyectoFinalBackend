import { cartModel } from "./cart.model.js";


const getAll = async ()=>{
    const carts = await cartModel.find();
    return carts
}

const cartId = async (cid)=>{
    const cartId = await cartModel.findById(cid).populate("products.product");
    return cartId
}

const create = async ()=>{
    const cart = await cartModel.create({});
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

const deleteProductToCart = async (cid,pid)=>{
   const cart = await cartModel.findById(cid);
   cart.products = cart.products.filter(e=> e.product.toString() !== pid);
   await cart.save();
   return cart;
}

const deleteAllProductToCart = async (cid)=>{
    const cart = await cartModel.findById(cid);
    cart.products = [];
    await cart.save();
   return cart;
}


export default{getAll,cartId,create, addProductToCart,upDateQuantity, deleteProductToCart,deleteAllProductToCart};