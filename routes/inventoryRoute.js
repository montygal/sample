// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const Util = require("../utilities")
const validate = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId);

//Route to Get Management View
router.get("/management", Util.handleErrors(invController.management));

//Route to Add Inventory
router.get("/add-inventory", Util.handleErrors(invController.addInventory));

//Route to Add Classification
router.get("/add-classification", Util.handleErrors(invController.addClassification));


//Route to Process New Classification
router.post('/add-classification', Util.handleErrors(invController.classification))
router.post("/add-classification",
    validate.classificationRules(),
    validate.checkClassificationData,
    Util.handleErrors(invController.classification)
)


// //Route to Adding and Processing New Vehicles
// router.post("/add-vehicle",
//     validate.addVehicleRules,
//     validate.checkVehicleData,
//     Util.handleErrors(invController.addVehicle)
//     )


module.exports = router