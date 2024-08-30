import mongoose from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        uniqued:true
    },
    purchase_datetime:{
        type: Date,
        required: true,
        default: Date.now()
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema)