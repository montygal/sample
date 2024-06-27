const utilities = require(".")
const {
  body,
  validationResult
} = require("express-validator")
const validate = {}


validate.checkClassificationData = async (req, res, next) => {
  const {
    classification_name
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Checking Classification Data",
      nav,
      classification_name
    })
    return
  }
  next()
}

/*  **********************************
 *  Classification Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // classification_name is required and must be string
    body("classification_name")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 1
    })
    .withMessage("Please provide a classification name."),
  ]
}



/* ******************************
 * Check data and add vehicle
 * ***************************** */
validate.addVehicleRules = async (req, res, next) => {
  return [
    // inv_make is required and must be string
    body("inv_make")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 1
    })
    .withMessage("Please provide the vehicle make."),

    // inv_model is required and must be string
    body("inv_model")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 2
    })
    .withMessage("Please provide the vehicle model."), // on error this message is sent.
    // inv_year is required and must be a string
    body("inv_year")
    .int()
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 1
    })
    .withMessage("Please provide the vehicle's year."),

    // description is required and must be string
    body("inv_description")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 2
    })
    .withMessage("Please provide a description of the vehicle"),

    // inv_price is required and must be string
    body("inv_price")
    .int()
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 1
    })
    .withMessage("Please provide the vehicle's price."),

    // inv_miles is required and must be a number
    body("inv_miles")
    .int()
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 2
    })
    .withMessage("Please provide the vehicle's miles."), // on error this message is sent.

    // inv_color is required and must be string
    body("inv_color")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 1
    })
    .withMessage("Please provide the vehicle's color."),
  ]
}


/* ******************************
 * Check data and return vehicle data
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_color,
    classification_id
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-vehicle", {
      errors,
      title: "Checking Vehicle Data",
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_color,
      classification_id,
    })
    return
  }
  next()
}

module.exports = validate