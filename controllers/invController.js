const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")



const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  console.log(data)
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const block = await utilities.buildSingleInventory(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
  res.render("./inventory/vehicle", {
    title: className,
    nav,
    errors: null,
    block,
  })
}



/* ****************************************
 *  Deliver management view
 * *************************************** */
invCont.management = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management",
    nav,
  })
}


//Deliver Classification View
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
  })
}

//Deliver Add Inventory Form
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
  })
}


invCont.classification = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    classification_name
  } = req.body

  const result = await invModel.classification(
    classification_name
  )

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${classification_name}.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the classification addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "classification",
      nav,
    })
  }
}


//Add Vehicle to Database
invCont.addVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  } = req.body
  console.log(inv_price);
  const result = await invModel.addVehicle(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color)

  if (result) {
    req.flash(
      "notice",
      `Congratulations, you\'ve added ${inv_make}, ${inv_model}.`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the inventory addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Inventory",
      nav,
    })
  }
}




module.exports = invCont