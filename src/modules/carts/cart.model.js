import mongoose from "mongoose";
import {productDto} from "../../dto/product.dto.js";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
    products:{
        type: [{product:{type:mongoose.Schema.Types.ObjectId, ref:"product"},quantity: Number}]
    },
})

cartSchema.pre("find", function (){
    this.populate("products.product")
  })

cartSchema.post("find", function(docs) {
    docs.forEach(doc => {
        doc.products = doc.products.map(p => ({
            product: productDto(p.product), // Aplicamos el DTO aquí
            quantity: p.quantity
        }));
    });
});
  
export const cartModel = mongoose.model(cartCollection, cartSchema);