const message = require("../models").message;
const Room = require("../models").Room;

exports.chatOfRoom = async (req, res) => {
    try {
        let roms = await Room.findOne({ where: { id: req.body.id } })
        if (roms) {
            let chats = await message.findAll({
                where: {
                    roomId: roms.id
                }
            })
            return res.send(chats)
        }
        return res.send({ error: "room not find"})
    } catch (error) {
        return res.send({ error: error.message })
    }

}

exports.allRooms = async(req,res)=>{
    let find = await Room.findAll()
    return res.send(find)
}
exports.createRoom = async (req,res)=>{
    try {
        if(req.body.title){
            
            let create = await  Room.create({title:req.body.title , createdAt:new Date , updatedAt:new Date})
            if(create){
                return res.send({message : `room ${req.body.title} is created`})
            }
        }else{return res.send({error : "title is required"})}
    
    } catch (error) {
        return res.send({error : error.message})
    }
}
exports.deleteRoom = async (req,res)=>{
    try {
        let find = await Room.findOne({where :{id:req.body.id}})
        if(find){
            await Room.destroy({where:{
                id:find.id 
            }})
            return res.send({message : `${find.title} deleted`})
        }else{return res.send({error : "room not find"})}
    } catch (error) {
        return res.send({error : error.message}) 
    }
}
exports.deleteMessage = async(req,res)=>{
    try {
        let find= await message.findOne({where :{
            [Op.and]:[{id:req.body.messageId},{senderId:req.user.id}]
        }})
        if(find){
            await message.destroy({where :{id:req.body.messageId}})
            return res.send({message : "delted"})
        }else{
            return res.send({error : "this message cant delete by this user"})
        }
    } catch (error) {
        return res.send({error:error.message})
    }

}