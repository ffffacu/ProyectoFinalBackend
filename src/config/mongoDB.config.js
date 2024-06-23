import mongoose from 'mongoose';

export const connectMongoDB = async () =>{
    try {
        mongoose.connect()
        console.log("Mongoose connected")
    } catch (error) {
        console.log(`Error: ${error}`)
    }
};