import cartDao from "./cart.dao.js";

const createCart = async()=>{return await cartDao.create();}

const getCartById = async(cid)=>{ return await cartDao.cartId(cid);}

const getCartAll = async()=>{return await cartDao.getAll();}

const addProductToCart = async(cid,pid)=>{return await cartDao.addProductToCart(cid,pid)}

const upDateQuantityProductToCart = async(cid,pid,quantity) => {return cartDao.upDateQuantity(cid,pid,quantity)}

const deleteProductToCart = async(cid,pid)=>{return await cartDao.deleteProductToCart(cid,pid)}

const deleteAllProductToCart = async(cid)=>{return await cartDao.deleteAllProductToCart(cid);}

export default {createCart,getCartAll,getCartById,addProductToCart,upDateQuantityProductToCart,deleteProductToCart,deleteAllProductToCart}
