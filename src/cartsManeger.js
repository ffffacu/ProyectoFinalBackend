import fs from "fs";

const pathFile= "./src/data/carts.json";

let cart = [];


const getCarts= async () =>{
    const cartJson = await fs.promises.readFile(pathFile, "utf8");
    const cartParse = JSON.parse(cartJson);
     return cart = cartParse || []
};

const cartGenerator = async ()=>{
     await getCarts();

     const newCarts ={
        id: cart.length + 1,
        products:[]
     };

     cart.push(newCarts);

     await fs.promises.writeFile(pathFile, JSON.stringify(cart));
     return newCarts
}

const cartId = async(cid)=>{
    await getCarts();
    const cartId = cart.find((c)=>c.id === cid);
    return cartId
}

const cartProduct = async (cid, pid)=>{
    await getCarts();
    const newProduct ={
        id: pid,
        quantity:1
    }
    const index = cart.findIndex((c)=>c.id === cid);
    
    
        cart[index].products.push(newProduct);

        await fs.promises.writeFile(pathFile, JSON.stringify(cart));
    
        return cart[index];
}

export default {cartGenerator,getCarts,cartProduct,cartId}
