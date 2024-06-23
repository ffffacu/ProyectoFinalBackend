import mongoose from "mongoose";
import mongoosePaginate from  "mongoose-paginate-v2";

const productCollection = "product"


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        default: [],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
});
productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productCollection,productSchema);