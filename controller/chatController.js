const message = require("../models").message;
const Room = require("../models").Room;

exports.chatOfRoom = async (req, res) => {
    try {
        let roms = await Room.findOne({ where: { title: req.body.room } })
        if (roms) {
            let chats = await message.findAll({
                where: {
                    roomId: roms.id
                }
            })
            return res.send(chats)
        }
        return res.send({ error: "room not find" })
    } catch (error) {
        return res.send({ error: error.message })
    }

}