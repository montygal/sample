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

//Get invenotry by classification id
router.get("/getInventory/:classification_id", Util.handleErrors(invController.getInventoryJSON));

//Get to the edit option
router.get('/edit/:invId', Util.handleErrors(invController.editInventoryView));
router.get('/edit-vehicle', Util.handleErrors(invController.editInventoryView));
//Route to Process New Classification
router.post('/add-classification', 
    // validate.classificationRules(),
    // validate.checkClassificationData,
    Util.handleErrors(invController.classification)
);

router.post('/add-inventory',
    // validate.addVehicleRules(),
    // validate.checkVehicleData,
    Util.handleErrors(invController.addVehicle)
);

router.post("/edit-vehicle/", Util.handleErrors(invController.updateInventory));

router.get("/delete/:invId", Util.handleErrors(invController.deleteVehicleConfirm));
router.post("/deleteVehicle", Util.handleErrors(invController.deleteVehicle));

//Route to get Reviews
router.get("/reviews", Util.handleErrors(invController.reviews));
router.get("/delete-reviews", Util.handleErrors(invController.deleteReviews));
router.get("/review-edit", Util.handleErrors(invController.updateReviews));
router.post('/reviews', 
    // validate.classificationRules(),
    // validate.checkClassificationData,
    Util.handleErrors(invController.addReview)
);

module.exports = router