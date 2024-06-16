import mongoose from 'mongoose';

export const connectMongoDB = async () =>{
    try {
        mongoose.connect("mongodb+srv://admin:156006@backendfacu.okcuevo.mongodb.net/")
        console.log("Mongoose connected")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
};