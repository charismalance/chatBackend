const router = require("express").Router();
const {chatOfRoom} = require("../controller/chatController")

router.post("/findChat",chatOfRoom)

module.exports = router