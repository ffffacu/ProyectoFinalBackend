import fs from "fs";

let products = [];

const pathFile = "./src/data/products.json";

const getProducts = async (limit) =>{
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    const productsJsonParse = JSON.parse(productsJson);
    products = productsJsonParse || [];
    if(!limit) return products;
    return products.slice(0,limit);
}

const addProduct = async (product)=>{
   await getProducts ();
   const { title, description, price, thumbnail, code, stock, category}= product;
   const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail: thumbnail || [],
    code,
    stock,
    category,
    status: true,
  };
   products.push(newProduct);
   await fs.promises.writeFile(pathFile,JSON.stringify(products));
   return product;
}

const getProductsById= async (id) =>{
    products = await getProducts();
    const productId = products.find((p)=> p.id === id);
    return productId
}

const updateProduct = async (id, productData) =>{
    await getProducts();
    const index = products.findIndex((p)=> p.id === id);
    products[index] = {
        ...products[index],
        ...productData,
    };
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    const product = await getProductsById(id);
    return product;
}

const deleteProduct = async (id) =>{
    const product = await getProductsById(id);
    const products = await getProducts();
    if (!product)return false;
    const productsDelete = products.filter((p)=> p.id != id);
    await fs.promises.writeFile(pathFile, JSON.stringify(productsDelete));
    return true
}



export default{ getProducts, getProductsById,addProduct, updateProduct,deleteProduct}