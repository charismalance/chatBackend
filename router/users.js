const router = require("express").Router();
const {chatOfRoom,createRoom,allRooms,deleteRoom,deleteMessage} = require("../controller/chatController")
const {auth,isAdmin} = require("../middleware/auth")
router.post("/findChat",chatOfRoom)
router.post("/createRoom",createRoom)
//router.post("/createRoom",[auth,isAdmin],createRoom)
router.get("/allRooms",allRooms)
router.post("/deleteRoom",deleteRoom)
router.post("/deleteMessage",[auth,isAdmin],deleteRoom)
//router.post("/deleteRoom",[auth,isAdmin],deleteRoom)
module.exports = router
