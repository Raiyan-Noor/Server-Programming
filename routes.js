const express = require("express");
const router = express.Router();
const chatController = require("./controllers/chatController");


router.get("/chat", chatController.getUserList);
router.post("/chat", chatController.postBook); 

router.get("/chat/inbox", chatController.getSqueak);  
router.post("/chat/inbox", chatController.postUsername);  
module.exports = router;
