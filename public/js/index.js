const socket = io();
const listProduct = document.getElementById("productListRender");
const addForm = document.getElementById("addForm");
const deleteForm =document.getElementById("deleteForm");



addForm.addEventListener("submit", async (e) =>{
   e.preventDefault();
   const title = document.getElementById("nameProduct").value;
   const price = document.getElementById("priceProduct").value;
   const description = document.getElementById("descriptionProduct").value;
   await fetch ("/realtimeproducts", {
    method:"POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify({title,price,description})
   })

   addForm.reset();
})
deleteForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const id = document.getElementById("idProduct").value;
    await fetch ("/realtimeproducts", {
        method:"DELETE",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({id})
       })
       deleteForm.reset()
})


socket.on("productsViews", async (data)=>{  
const products = document.createElement ("div")
products.setAttribute("id", "listProductId")
listProduct.appendChild(products)
    await data.forEach((product) => {
        const cart = document.createElement("div");
        cart.classList.add("card");
        cart.innerHTML=`
        <div class="text-center p-4" >
        <h2 class="text-red-600 font-bold text-lg">${product.title}</h2>
        <p class="text-zinc-500">Id de producto: ${product.id}</p>
        <p class="text-zinc-500">${product.description}</p>
        <p class="text-zinc-800 font-bold text-xl">$${product.price}</p>
         </div>
        `
        products.appendChild(cart)
    });
})
socket.on("deletList",()=>{
    const element = document.getElementById("listProductId");
    if(!element){
        return
    }else{
        element.remove()
    }
 
})
