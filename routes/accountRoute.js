// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")




// Route to build inventory by classification view
router.get(accountController.buildLogin);
module.exports = router