import cartRepository from "./cart.repository.js";
import productRepository from "../products/product.repository.js";
import { productDto } from "../../dto/product.dto.js";


const createCart = async()=>{return await cartRepository.create();}

const getCartById = async(cid)=>{ return await cartRepository.cartId(cid);}

const getCartAll = async()=>{return await cartRepository.getAll();}

const addProductToCart = async(cid,pid)=>{return await cartRepository.addProductToCart(cid,pid)}

const upDateQuantityProductToCart = async(cid,pid,quantity) => {return cartRepository.upDateQuantity(cid,pid,quantity)}

const deleteProductToCart = async(cid,pid)=>{return await cartRepository.deleteProductToCart(cid,pid)}

const deleteAllProductToCart = async(cid)=>{return await cartRepository.deleteAllProductToCart(cid);}

const purchaseCart = async(cid)=>{
    const cart = await cartRepository.cartId(cid);
    let total = 0;
    const productsWithOutStock=[];
    for(const productCart of cart.products){
        const product = await productRepository.getProductsById(productCart.product);
        if(product.stock >= productCart.quantity){
            total += product.price * productCart.quantity;
            await productRepository.update(product._id,{stock: product.stock - productCart.quantity});
        }else{
            productsWithOutStock.push(productCart);
        }
        await cartRepository.update(cart._id,{products:productsWithOutStock});
    }
    return total;
}

export default {createCart,getCartAll,getCartById,addProductToCart,upDateQuantityProductToCart,deleteProductToCart,deleteAllProductToCart,purchaseCart}
