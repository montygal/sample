// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const regValidate = require('../utilities/account-validation')
const Util = require("../utilities")
const accountController = require("../controllers/accountController")
const invCont = require("../controllers/invController")



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId);





// Route to build inventory by classification view
// router.get("/add-classification")
// router.get("/add-inventory")
router.get("/management", invController.management);
router.get("/add-classification", invController.addClassification);
router.get("/add-inventory", invController.addInventory);
// router.post('/buildVehicle', Util.handleErrors(invController.buildVehicle))
// router.get("/login", Util.handleErrors(accountController.buildLogin))
// router.get("/register", Util.handleErrors(accountController.buildRegister))

// router.post(
//     "/addVehicle",
//     Util.handleErrors(invController.addVehicle)
//   )
module.exports = router