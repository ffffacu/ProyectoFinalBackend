import {ticketModel} from "./ticket.model.js"

const  getTicket = async ()=>{
    const ticket = await ticketModel.find()
    return ticket
}

const getTicketById = async (id) =>{
    const ticketId = await ticketModel.findById(id)
    return ticketId
}

const create = async (data)=>{
    const ticket = await ticketModel.create(data)
    return ticket
}

const update = async (id, data) =>{
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id,data, {new:true});
    return ticketUpdate;
}

const deleteOne = async (id) =>{
    const ticketDelete = await ticketModel.deleteOne({_id:id});
    return ticketDelete
}

export default{getTicket,getTicketById,create,update,deleteOne}