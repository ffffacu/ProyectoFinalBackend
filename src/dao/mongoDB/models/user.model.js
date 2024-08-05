import mongoose from 'mongoose';


const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name:{
        type: 'string',
        required: true
    },
    last_name:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
    },
    email:{
        type: 'string',
        required: true
    },
    age:{
        type: 'number'
    },
    role:{
        type: 'string',
        default: 'user'
    },
    status:{
        type:'boolean',
        default:true,
    },
    cart:{type:mongoose.Schema.Types.ObjectId, ref:"cart"}
})

userSchema.pre("findOne", function (){
    this.populate("cart");
})

export const userModel = mongoose.model(userCollection,userSchema);
