import { userModel } from "./user.model.js";

const getAll = async (query, options) => {
    const users = await userModel.paginate(query, options)
    return users;
}

const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

const getByEmail = async (email) => {
    const user = await userModel.findOne({ email: email});
    return user;
}

const create = async (data) => {
    const user = await userModel.create(data);
    return user;
}

const update = async (id,data) => {
    const user = await userModel.findByIdAndUpdate(id,data,{new:true});
    return user;
}

const deleteOne = async (id) => {
    const user = await userModel.findByIdAndUpdate(id, {status:false}, {new:true});
    return user;
}

export default{ getAll, getById, getByEmail, update, create, deleteOne};